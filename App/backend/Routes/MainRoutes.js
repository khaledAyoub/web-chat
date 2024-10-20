import { Router } from "express";
import getMessages from "../controllers/main.controllers/getmessages.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import getUser from "../controllers/main.controllers/getUser.js";
import getPeople from "../controllers/main.controllers/getPeople.js";
import getSingleChat from "../controllers/main.controllers/getSingleChat.js";
import sendMessage from "../controllers/main.controllers/sendMessage.js";
import getUserImage from "../controllers/main.controllers/getUserImage.js";
import getUserBanner from "../controllers/main.controllers/getUserBanner.js";
import fileUpload from "../controllers/main.controllers/fileUpload.js";
import fileDownload from "../controllers/main.controllers/fileDownload.js";

const mainRoutes = Router();

mainRoutes.get("/getMessages", verifyToken, getMessages);

mainRoutes.post("/getUser/:username", getUser);
mainRoutes.post("/getSingleChat/:username", verifyToken, getSingleChat);
mainRoutes.get("/getPeople", verifyToken, getPeople);
mainRoutes.post("/sendMessage", verifyToken, sendMessage);
mainRoutes.post("/getUserImage", verifyToken, getUserImage);
mainRoutes.post("/getUserBanner", verifyToken, getUserBanner);
mainRoutes.post("/fileUpload", verifyToken, fileUpload);
mainRoutes.post("/fileDownload", verifyToken, fileDownload);

export default mainRoutes;
