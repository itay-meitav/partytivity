import path from "path";
require("dotenv").config({ path: path.join(__dirname, "../../../.env") });
import express from "express";
import multer from "multer";
import fs from "fs";
import { isAuthenticated } from "../auth/authMiddle";
import cloudinary from "cloudinary";

const router = express.Router();
router.use("/photos", express.static(__dirname + "/photos/"));

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const cloudinaryUploader = async (filePath) => {
  return await cloudinary.v2.uploader.upload(
    filePath,
    { timestamp: new Date().getTime() },
    (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      fs.unlinkSync(filePath);
      return result;
    }
  );
};

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
    return cb(null, true);
  } else {
    const error: Error = new Error("Wrong file type!");
    error.name = "LIMIT_FILE_TYPES";
    cb(error, false);
  }
}

router.post("/", isAuthenticated, async (req, res) => {
  upload(req, res, async (err) => {
    let uploadsLinksArr = [];
    let uploadsNamesArr = [];
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
    }
    const cloudUpload = (req.files as any[]).map(async (file) => {
      await cloudinaryUploader(file.path).then((res) => {
        uploadsNamesArr.push(res.public_id);
        uploadsLinksArr.push(res.url);
      });
    });
    await Promise.all(cloudUpload);
    return res.json({
      message: "Files Uploaded!",
      files: uploadsLinksArr,
      names: uploadsNamesArr,
      // files: req.files,
      success: true,
    });
  });
});

router.post("/remove", isAuthenticated, async (req, res) => {
  if (req.body.photos) {
    try {
      cloudinary.v2.api.delete_resources(req.body.photos);
      return res.json({
        success: true,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
      });
    }
  }
  return res.status(500).json({
    success: false,
  });
});

export default router;
