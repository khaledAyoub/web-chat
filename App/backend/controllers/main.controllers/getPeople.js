import User from "../../models/user.model.js";

export default async (req, res) => {
  const id = req.ID;

  try {
    const user = await User.findOne({ _id: id })
      .populate("friends", "_id userName email about image banner")
      .populate("blockList", "_id userName email about image banner");

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.status(200).json({
      friends: user.friends,
      blockList: user.blockList,
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      error: "An error occurred while fetching the user data.",
    });
  }
};
