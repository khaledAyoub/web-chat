import User from "../../models/user.model.js";

export default async (request, response, next) => {
  try {
    const userData = await User.findById(request.ID);
    if (!userData) {
      return response.status(404).send("User with given id not found.");
    }

    return response.status(200).json({
      id: userData.id,
      email: userData.email,
      fullName: userData.fullName,
      userName: userData.userName,
      about: userData.about,
      profileSetup: userData.profileSetup,
      phone: userData.phoneNumber,
      noOffriends: userData.friends.length,
      BlockListSize: userData.blockList.length,
    });
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal Service Error");
  }
};
