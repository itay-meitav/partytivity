import express, { NextFunction, Request, Response } from "express";
import multer from "multer";
import path from "path";
import { isAuthenticated } from "../auth/authMiddle";
const router = express.Router();

const storage = multer.diskStorage({
  destination: "./photos/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).array("uploadedImages", 4);

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

router.post("/", isAuthenticated, async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(500).json({
        message: err || "Internal Server Error",
        success: false,
      });
    } else {
      if (req.file == undefined) {
        res.status(401).json({
          message: "Error: No File Selected!",
          success: false,
        });
      } else {
        res.json({
          message: "Files Uploaded!",
          files: req.files,
          success: true,
        });
      }
    }
  });
});

export default router;
