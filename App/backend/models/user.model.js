import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    trim: true,
  },
  userName: {
    type: String,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: false,
    default: "",
  },
  about: {
    type: String,
    trim: true,
    default: "hello",
  },
  password: {
    type: String,
    required: true,
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      default: [],
    },
  ],
  blockList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      default: [],
    },
  ],
  hide: {
    type: Boolean,
    default: false,
  },
  notification: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String,
    required: false,
    default: "uploads/profiles/defualtprofileimage.jpeg",
  },
  banner: {
    type: String,
    trim: true,
    default: "uploads/banners/defualtbanner.jpg",
  },
  profileSetup: {
    type: Boolean,
    default: false,
  },
  color: {
    type: Number,
    required: false,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
