import User from "../../models/user.model.js";
import path from "path";

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

    return res.sendFile(path.resolve(user.banner));
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching the user's image." });
  }
};
