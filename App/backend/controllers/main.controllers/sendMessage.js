import Message from "../../models/message.model.js";
import Chat from "../../models/chat.model.js";

export default async (req, res) => {
  try {
    const senderID = req.ID;
    const chatID = req.body.chatID;
    const content = req.body.content;

    if (!chatID) {
      return res.status(400).json({ error: "Chat ID is required." });
    }
    if (!content) {
      return res.status(400).json({ error: "Message can't be empty." });
    }

    // Create the message
    const message = await Message.create({
      senderId: senderID,
      content,
    });

    // Find the chat by ID and add the message to it
    const chat = await Chat.findById(chatID);
    if (!chat) {
      return res.status(404).json({ error: "Chat not found." });
    }

    chat.messages.push(message._id);
    await chat.save();

    // Respond with success
    return res.status(201).json({
      chatID,
      message: message,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
