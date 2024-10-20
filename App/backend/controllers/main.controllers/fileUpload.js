import { rename } from "fs/promises";
import { existsSync, mkdirSync } from "fs";
import Message from "../../models/message.model.js";
import Chat from "../../models/chat.model.js"; // Assuming Chat model is here

export default async (request, response, next) => {
  try {
    // Check if the file exists
    if (!request.file) {
      return response.status(400).send("File is required");
    }

    // Check if the file type is an image or video
    const contentType = request.file.mimetype;
    if (!contentType.startsWith("image/")) {
      return response
        .status(400)
        .send("Invalid file type. Only images  are allowed.");
    }

    // Ensure the uploads directory exists
    const uploadDir = "uploads/files/";
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }

    // Generate the new file name
    const date = Date.now();
    const fileName = uploadDir + date + "-" + request.file.originalname;

    // Rename the uploaded file (move it to the desired location)
    await rename(request.file.path, fileName);

    // Create a new message with the file path as content and associate it with the chat
    const newMessage = await Message.create({
      senderId: request.ID, // Assuming request.ID is the user ID
      content: fileName, // Save the file path as the message content
      text: false,
    });

    // Assuming you have a Chat model and want to append the message to the chat
    const chat = await Chat.findByIdAndUpdate(
      request.body.chatID, // Assuming chatID is passed in the request body
      { $push: { messages: newMessage._id } }, // Append the new message to the chat
      { new: true } // Return the updated chat document
    );

    if (!chat) {
      return response.status(404).send("Chat not found");
    }

    console.log("File uploaded successfully");

    // Return success response with the new message
    return response.status(200).json(newMessage);
  } catch (error) {
    console.error("Error during file upload:", error);
    return response.status(500).send("Internal Server Error");
  }
};
