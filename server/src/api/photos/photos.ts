import express, { NextFunction, Request, Response } from "express";
import multer, { diskStorage, memoryStorage } from "multer";
import sharp from "sharp";
import path from "path";
import { isAuthenticated } from "../auth/authMiddle";

const router = express.Router();
router.use("/photos", express.static(__dirname + "/photos/"));

const storage = multer.diskStorage({
  destination: "./src/api/photos/photos/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 },
  fileFilter: async (req, file, cb) => {
    await checkFileType(file, cb);
  },
}).array("files", 4);

async function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    // const imageFile = await sharp(file.originalname)
    //   .resize(800, 400)
    //   .toFile(
    //     `/api/photos/${Date.now()}-${file.originalname.split(" ").join("-")}`
    //   );
    return cb(null, true);
  } else {
    const error: Error = new Error("Wrong file type!");
    error.name = "LIMIT_FILE_TYPES";
    cb(error, false);
  }
}

router.post("/", isAuthenticated, async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      if (err.name == "LIMIT_FILE_TYPES") {
        return res
          .status(422)
          .json({ massage: "Only images are allowed", success: false });
      } else if (err.code == "LIMIT_FILE_SIZE") {
        return res.status(422).json({
          massage: `Too large. Max size is ${5000000 / 1000}KB`,
          success: false,
        });
      } else if (err.code == "LIMIT_UNEXPECTED_FILE") {
        return res.status(422).json({
          massage: `You can upload up to 4 images only`,
          success: false,
        });
      } else {
        return res.status(501).json({
          massage: err,
          success: false,
        });
      }
    }
    for (let i = 0; i < req.files.length; i++) {
      const element = req.files[i];
      let buffer = await sharp(element.path).resize(800, 400).toBuffer();
      await sharp(buffer).toFile(element.path);
    }
    res.json({
      message: "Files Uploaded!",
      files: req.files,
      success: true,
    });
  });
});

export default router;
