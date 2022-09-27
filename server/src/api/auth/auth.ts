import express, { Request, Response } from "express";
import { changeUserStatus, checkUserEmail } from "src/db/users";
import jwt from "jsonwebtoken";
import authConfig from "./auth.config";
const router = express.Router();

interface JWTData {
  email: string;
}

router.get("/confirm/:token", async (req: Request, res: Response) => {
  const token = req.params.token;
  const decoded = jwt.verify(token, authConfig.secret);
  if (!decoded) return res.status(401).send({ message: "Unauthorized!" });
  await checkUserEmail({ email: (decoded as JWTData).email }).then(
    async (user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found" });
      }
      await changeUserStatus(user.username).then(() => {
        return res
          .status(200)
          .send({ message: "User is now active" })
          .redirect("/login");
      });
    }
  );
});

export default router;
