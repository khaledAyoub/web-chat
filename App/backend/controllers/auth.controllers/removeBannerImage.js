import User from "../../models/user.model.js";
import { unlinkSync } from "fs";

export default async (request, response) => {
  try {
    const { ID } = request;
    const user = await User.findById(ID);

    if (!user) {
      return response.status(404).send("User Not found");
    }

    if (user.banner) {
      unlinkSync(user.banner);
    }

    user.banner = null;
    await user.save();

    return response.status(200).send("Banner Image Removed");
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal Service Error");
  }
};
