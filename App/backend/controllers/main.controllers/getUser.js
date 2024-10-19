import User from "../../models/user.model.js";

export default async (req, res) => {
  const username = req.params.username;

  try {
    const user = await User.findOne({ userName: username });

    if (!user) {
      return res.status(404).json({
        error: "User isn't found",
      });
    }

    const { _id, userName, email, about, pfp, banner } = user;
    res.status(200).json({
      _id,
      userName,
      about,
      email,
      pfp,
      banner,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching the user.",
    });
  }
};
