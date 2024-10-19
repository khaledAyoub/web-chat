import bcrypt from "bcrypt";
import User from "../../models/user.model.js";

export default async (request, response, next) => {
  try {
    const userID = request.ID;
    const { oldPass, newPass } = request.body;

    if (!oldPass || !newPass) {
      return response.status(400).send("old and new password are Required");
    }
    const user = await User.findById(userID);

    if (!user) {
      return response.status(404).send("User Not found.");
    }

    const check = await bcrypt.compare(oldPass, user.password);

    if (!check) {
      return response.status(400).send("Old password is Incorrect");
    }

    const newHashedPassword = await bcrypt.hash(
      newPass,
      parseInt(process.env.SALT_ROUNDS) || 10
    );

    user.password = newHashedPassword;

    await user.save();

    return response.status(200).json({
      message: "password changed",
    });
  } catch (error) {
    return response.status(500).send("Internal Service Error");
  }
};
