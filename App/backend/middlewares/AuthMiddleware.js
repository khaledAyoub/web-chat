import jwt from "jsonwebtoken";

export const maxAge = 3 * 24 * 60 * 60 * 1000;

export const verifyToken = (request, response, next) => {
  const token = request.cookies.jwt;
  if (!token) {
    return response.status(401).send("You are not authenticated!");
  }
  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return response.status(403).send("Token is not valid");
    request.ID = payload.ID;
    request.userName = payload.userName;

    next();
  });
};

export const createToken = (ID, userName) => {
  return jwt.sign({ ID, userName }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};
