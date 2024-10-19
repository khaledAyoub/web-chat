import User from "../../models/user.model.js";
import { renameSync } from "fs";

export default async (request, response, next) => {
  try {
    if (!request.file) {
      return response.status(400).send("file is required");
    }
    const date = Date.now();
    let fileName = "uploads/banners/" + date + request.file.originalname;
    renameSync(request.file.path, fileName);

    const updatedUser = await User.findByIdAndUpdate(
      request.ID,
      { banner: fileName },
      { new: true, runValidators: true }
    );
    return response.status(200).json({
      banner: updatedUser.banner,
    });
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal Service Error");
  }
};
