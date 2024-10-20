import mongoose from "mongoose";
import Chat from "../../models/chat.model.js";
import User from "../../models/user.model.js";

export default async (req, res) => {
  try {
    const signedUserID = req.ID;

    const userName = req.params.username;

    if (!userName) {
      return res.status(400).json({ message: "Username is required" });
    }

    const signedUser = await User.findById(signedUserID);

    const otherUser = await User.findOne({ userName });

    // Check if user exists
    if (!otherUser) {
      return res.status(404).json({ message: "No user found" });
    }

    if (signedUser._id.equals(otherUser._id)) {
      return res.status(400).json({ message: "You can't chat with yourself" });
    }

    // Search for chat
    let chat = await Chat.findOne({
      single: true,
      users: {
        $all: [signedUser._id, otherUser._id],
        $size: 2,
      },
    }).populate({
      path: "messages",
      select: "senderId content text createdAt",
      options: { sort: { createdAt: 1 } },
    });

    if (!chat) {
      // Create new chat if not found and user is not hidden
      if (otherUser.hide) {
        return res.status(400).json({ message: "user not found" });
      }
      chat = new Chat({
        single: true,
        users: [signedUser.id, otherUser.id],
      });
      await chat.save();

      if (!signedUser.friends.includes(otherUser._id)) {
        signedUser.friends.push(otherUser._id);
      }

      if (!otherUser.friends.includes(signedUser._id)) {
        otherUser.friends.push(signedUser._id);
      }

      await signedUser.save();
      await otherUser.save();
    }

    // Structure response
    const response = {
      chatID: chat._id,
      userID: otherUser._id,
      messages: chat.messages,
      user: {
        userName: otherUser.userName,
        email: otherUser.email,
        phone: otherUser.phoneNumber,
        about: otherUser.about,
        image: otherUser.image,
        banner: otherUser.banner,
        color: otherUser.color,
      },
    };

    return res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the user." });
  }
};
