import User from "../../models/user.model.js";
import path from "path";
import fs from "fs"; // For checking file existence

export default async (req, res) => {
  const { userName } = req.body;

  if (!userName) {
    return res.status(400).json({ message: "User not found" });
  }

  try {
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const imagePath = path.resolve(user.image);

    // Check if the file exists before sending it
    if (fs.existsSync(imagePath)) {
      return res.sendFile(imagePath);
    } else {
      return res.status(404).json({ message: "Image not found" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching the user's image." });
  }
};
