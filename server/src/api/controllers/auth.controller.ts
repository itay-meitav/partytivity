import { Request, Response } from "express";
import { changeUserStatus } from "../../database/users";
import jwt, { JwtPayload } from "jsonwebtoken";
import envConfig from "../config/environment.config";

export const auth = async (req: Request, res: Response) => {
  const token = req.params.token;
  const cookie = req.cookies.verify;
  if (token && cookie) {
    try {
      const { email } = jwt.verify(token, envConfig.JWT_SECRET) as JwtPayload;
      await changeUserStatus(email).then(() => {
        return res
          .clearCookie("verify")
          .json({ message: "User is now active", success: true });
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        success: false,
      });
    }
  } else {
    return res.status(404).json({
      message: "Some credentials are missing",
      success: false,
    });
  }
};
