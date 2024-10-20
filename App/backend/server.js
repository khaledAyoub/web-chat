import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./Routes/AuthRoutes.js";
import mainRoutes from "./Routes/MainRoutes.js";
import connectToDB from "./DB/connectToMongoDB.js";
import cors from "cors";
import { app, server } from "./socketIO/socket.io.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";

dotenv.config();

const port = process.env.PORT || 3001;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Web-Chat-App API Documentation",
      version: "1.0.0",
      description:
        "A comprehensive API designed to support the development of a real-time chat application. This API handles user authentication, message sending, group chats, and notifications, providing a scalable solution for modern web and mobile chat platforms. It integrates seamlessly with various front-end technologies and is built for performance and security.",
    },

    servers: [
      {
        url: "http://localhost:8747",
        description: "Development server",
      },
    ],
  },
  apis: ["./backend/Routes/*.js", "./backend/models/*.js", "./swaggerDocs.js"],
};
const swaggerdocs = swaggerJSDoc(options);
app.use("/api/doc", swaggerUi.serve, swaggerUi.setup(swaggerdocs));

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

const __dir = path.resolve();
app.use(express.static(path.join(__dir, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dir, "frontend", "dist", "index.html"));
});

// Port assigning
server.listen(port, () => {
  connectToDB();
  console.log(`Server is running at http://localhost:${port}`);
});
