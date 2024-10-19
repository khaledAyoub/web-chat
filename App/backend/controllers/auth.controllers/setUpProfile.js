import User from "../../models/user.model.js";
export default async (request, response, next) => {
  try {
    const { ID } = request;
    const { fullName, userName, color } = request.body;
    if (!fullName || !userName) {
      return response
        .status(400)
        .send("First name last name and color is required.");
    }

    const temp = await User.findOne({ userName });
    if (temp) {
      return response.status(400).send("Username already exists");
    }

    const userData = await User.findByIdAndUpdate(
      ID,
      {
        fullName,
        userName,
        color,
        profileSetup: true,
      },
      { new: true, runValidators: true }
    );

    return response.status(200).json({
      id: userData.id,
      email: userData.email,
      fullName: userData.firstName,
      userName: userData.lastName,
      image: userData.image,
      banner: userData.banner,
      about: userData.about,
      color: userData.color,
      profileSetup: userData.profileSetup,
    });
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal Service Error");
  }
};
