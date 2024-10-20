import { Router } from "express";
import signup from "../controllers/auth.controllers/signup.js";
import login from "../controllers/auth.controllers/login.js";
import multer from "multer";
import getUserInfo from "../controllers/auth.controllers/getUserInfo.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import setUpProfile from "../controllers/auth.controllers/setUpProfile.js";
import addProfileImage from "../controllers/auth.controllers/addProfileImage.js";
import addBannerImage from "../controllers/auth.controllers/addBannerImage.js";
import removeProfileImage from "../controllers/auth.controllers/removeProfileImage.js";
import updateProfie from "../controllers/auth.controllers/updateProfie.js";
import changePassword from "../controllers/auth.controllers/changePassword.js";
import removeBannerImage from "../controllers/auth.controllers/removeBannerImage.js";
import fileUpload from "../controllers/main.controllers/fileUpload.js";

const authRoutes = Router();
const uploadpfp = multer({ dest: "uploads/profiles/" });
const uploadbanner = multer({ dest: "uploads/banners/" });
const uploadfile = multer({ dest: "uploads/files/" });
authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.post("/setup-profile", verifyToken, setUpProfile);
authRoutes.get("/user-info", verifyToken, getUserInfo);

/**/ authRoutes.post("/update-profile", verifyToken, updateProfie);

/**/ authRoutes.post("/change-password", verifyToken, changePassword);

authRoutes.post(
  "/add-profile-image",
  verifyToken,
  uploadpfp.single("profile-image"),
  addProfileImage
);
authRoutes.post(
  "/add-banner-image",
  verifyToken,
  uploadbanner.single("banner-image"),
  addBannerImage
);
authRoutes.post(
  "/fileUpload",
  verifyToken,
  uploadfile.single("file-uploads"),
  fileUpload
);
authRoutes.delete("/remove-profile-image", verifyToken, removeProfileImage);
authRoutes.delete("/remove-banner-image", verifyToken, removeBannerImage);

export default authRoutes;
