import mongoose from "mongoose";
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("conected");
  } catch (err) {
    console.log("error : connecting to db faild");
  }
};

export default connectToDB;
