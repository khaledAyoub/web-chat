import User from "../../models/user.model.js";

export default async (req, res) => {
  const userID = req.ID;

  const user = await User.findById(userID);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const { userName, fullName, about, phone } = req.body;

  if (!userName) {
    return res.status(400).json({ message: "Please enter a username" });
  }
  if (!fullName) {
    return res.status(400).json({ message: "Please enter a full name" });
  }

  const exsits = await User.findOne({ userName });

  if (exsits && exsits.id !== userID) {
    return res.status(400).json({ message: "Username already exists" });
  }

  user.fullName = fullName;
  user.userName = userName;
  user.about = about;
  user.phoneNumber = phone;

  await user.save();

  res.status(200).json({ fullName, userName, about, phone });
};
