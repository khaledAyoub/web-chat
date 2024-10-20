import { Server } from "socket.io";
import http from "http";
import express, { query } from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  },
});

const userSocketMap = {}; // {userId: socketId}
io.on("connection", (socket) => {
  const id = socket.id;
  socket.on("sendInfo", (socket) => {
    const socketID = id;
    const userID = socket.query.myID;
    userSocketMap[userID] = socketID;
  });

  socket.on("sendMessage", (socket) => {
    io.to(userSocketMap[socket.query.userID]).emit("render", {
      query: {
        chatID: socket.query.chatID,
        userID: socket.query.userID,
        message: socket.query.message,
      },
    });
  });
  socket.on("typing", (data) => {
    const { chatID, userID } = data.query;

    const userSocket = userSocketMap[userID];
    if (userSocket) {
      io.to(userSocket).emit("typing", {
        query: { chatID, userID },
      });
    }
  });

  socket.on("disconnect", () => {
    const userID = socket.handshake.query.myID;
    if (userID) {
      delete userSocketMap[userID];
    }
  });
});

export { app, server, io };
