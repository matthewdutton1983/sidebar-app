const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const port = process.env.PORT || 3001;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.use(express.static("uploads"));

app.post("/upload", upload.single("file"), (req, res) => {
  res
    .status(200)
    .send({ message: "File uploaded successfully", file: req.file });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
