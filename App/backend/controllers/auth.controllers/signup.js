import bcrypt from "bcrypt";
import User from "../../models/user.model.js";
import { createToken, maxAge } from "../../middlewares/AuthMiddleware.js";
import shortid from "shortid";

export default async (request, response, next) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json("Some Missing data");
    }
    if (await User.findOne({ email })) {
      return response.status(400).json("Email is already used");
    }

    const hashedpasword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS) || 10
    );

    const user = await User.create({
      email,
      password: hashedpasword,
      userName: shortid.generate(),
    });

    response.cookie("jwt", createToken(user.id, user.userName), {
      maxAge,
      secure: true,
      sameSite: "None",
    });

    return response.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    console.log(error);

    return response.status(500).send("Internal Service Error");
  }
};
