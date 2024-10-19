import User from "../../models/user.model.js";
import { renameSync } from "fs";

export default async (request, response, next) => {
  try {
    if (!request.file) {
      return response.status(400).send("file is required");
    }
    const date = Date.now();
    let fileName = "uploads/profiles/" + date + request.file.originalname;
    renameSync(request.file.path, fileName);
    console.log(fileName);

    const updatedUser = await User.findByIdAndUpdate(
      request.ID,
      { image: fileName },
      { new: true, runValidators: true }
    );
    return response.status(200).json({
      image: updatedUser.image,
    });
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal Service Error");
  }
};
