import User from "../../models/user.model.js";

export default async (request, response) => {
  try {
    const id = request.ID;
    if (!id) {
      return response.status(400).json({ message: "ID is required" });
    }

    const user = await User.findById(id);
    if (!user) {
      return response.status(400).json({ message: "User not found" });
    }

    response.status(200).json(user.profileSetup);
  } catch (error) {
    return response.status(400).json({ message: "Server Error" });
  }
};
