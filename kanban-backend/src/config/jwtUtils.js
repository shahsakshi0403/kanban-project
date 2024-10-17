import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
  const secretKey = process.env.JWT_SECRET;
  const options = {
    expiresIn: "1h", // Token expiration time
  };

  const token = jwt.sign(payload, secretKey, options);
  return token;
};
