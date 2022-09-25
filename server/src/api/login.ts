import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import { checkIfUserExist } from "src/db/users";
const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const check = await checkIfUserExist(username);

  if (check) {
    if (check.confirmed) {
      return bcrypt.compare(password, check.password, (err, result) => {
        if (result) {
          return res.json({
            success: true,
          });
        } else {
          return res.json({
            message: "The password entered is incorrect",
            success: false,
          });
        }
      });
    } else {
      return res.json({
        message: "The user is not authenticated in the system",
        success: false,
      });
    }
  } else {
    return res.json({
      message: "This user does not exist",
      success: false,
    });
  }
});

export default router;
