import SingleChat from "../../models/chat.model.js";

export default async (request, res) => {
  const { ID, userName } = request;
  const otherUser = request.params.username;

  try {
    // Check for the required parameter
    if (!ID) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Find all chats where the user is either user1 or user2
    const chats = await SingleChat.find({
      $or: [{ user1: userID }, { user2: userID }],
    }).populate("messages");

    // Transform the chats into the desired format
    const formattedChats = chats.map((chat) => ({
      chatId: chat._id, // Assuming _id is the chat ID
      messages: chat.messages, // Messages will be an array
    }));

    res.json(formattedChats);
  } catch (error) {
    console.error("Error retrieving messages:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching messages" });
  }
};
