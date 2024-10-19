import bcrypt from "bcrypt";
import User from "../../models/user.model.js";
import { createToken, maxAge } from "../../middlewares/AuthMiddleware.js";

export default async (request, response, next) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).send("Email and Password Required");
    }
    const user = await User.findOne({ email });
    if (!user) {
      return response.status(404).send("User Not found.");
    }
    const auth = await bcrypt.compare(password, user.password);

    if (!auth) {
      return response.status(400).send("Password Incorrect");
    }

    response.cookie("jwt", createToken(user.id, user.userName), {
      maxAge,
      secure: true,
      sameSite: "None",
    });
    return response.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        userName: user.userName,
        pfp: user.pfp,
        banner: user.banner,
        friends: user.friends,
        blockList: user.blockList,
        about: user.about,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    return response.status(500).send("Internal Service Error");
  }
};
