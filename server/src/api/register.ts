import express, { Request, Response } from "express";
import { addUser } from "src/db/users";
const router = express.Router();

router.post("/", async (res: Response, req: Request) => {
  const { username, password, email } = req.body;
  if (username && password && email) {
    await addUser({ username, password, email })
      .then(() => {
        res.json({
          success: true,
        });
      })
      .catch((err) => {
        console.log(err);
        res.json({
          message: "something went wrong please try again later",
          success: false,
        });
      });
  } else {
    res.json({
      message: "make sure to send all the necessary fields",
      success: false,
    });
  }
});

export default router;
