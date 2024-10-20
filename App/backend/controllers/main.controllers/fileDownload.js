import path from "path";
import fs from "fs";

export default async (req, res) => {
  const { filepath } = req.body;

  if (!filepath) {
    return res.status(400).json({ error: "File path is required." });
  }

  try {
    const resolvedPath = path.resolve(filepath);

    // Check if the file exists before sending it
    if (fs.existsSync(resolvedPath)) {
      return res.sendFile(resolvedPath);
    } else {
      return res.status(404).json({ error: "File not found." });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while sending the file." });
  }
};
