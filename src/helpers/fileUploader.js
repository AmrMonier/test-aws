import multer from "multer";
const uploadPhoto = (req, res, next) => {
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 2000000,
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
        req.errors = {
          photo: "invalid file type only jpg,png or jpeg are allowed",
        };
      }
      return cb(undefined, true);
    },
  });
  const middleware = upload.single("photo");
  return middleware(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      req.errors = { photo: err.message };
    }
    next();
  });
};
export { uploadPhoto };
