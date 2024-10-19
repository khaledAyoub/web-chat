import User from "../../models/user.model.js";
import { unlinkSync } from "fs";

export default async (request, response, next) => {
  try {
    const { ID } = request;
    const user = await User.findById(ID);

    if (!user) {
      return response.status(404).send("User Not found");
    }

    if (user.image) {
      unlinkSync(user.image);
    }

    user.image = null;
    await user.save();

    return response.status(200).send("Profile Image Removed");
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal Service Error");
  }
};
