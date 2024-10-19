import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./Routes/AuthRoutes.js";
import mainRoutes from "./Routes/MainRoutes.js";
import connectToDB from "./DB/connectToMongoDB.js";
import cors from "cors";
import { app, server } from "./socketIO/socket.io.js";

dotenv.config();

const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use("/uploads/profiles", express.static("uploads/profiles"));

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/main", mainRoutes);

// Port assigning
server.listen(port, () => {
  connectToDB();
  console.log(`Server is running at http://localhost:${port}`);
});
