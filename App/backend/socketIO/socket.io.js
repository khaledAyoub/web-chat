import { Server } from "socket.io";
import http from "http";
import express, { query } from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
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
      query: { chatID: socket.query.chatID, message: socket.query.message },
    });
  });
});

export { app, server, io };
