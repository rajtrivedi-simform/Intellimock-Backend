import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY, JWT_REFRESH_KEY } from "../../configs/env.config";

export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, JWT_REFRESH_KEY, {
    expiresIn: "7d",
  });
};
