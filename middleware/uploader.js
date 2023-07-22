const multer = require("multer");
console.log("This is multer package method!:", multer);
const path = require("path");

const storage = multer.diskStorage({
    destination: "images/",
    filename:  (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
      }
})

const uploader = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const supportedImage = /png|pdf|jpg/;
        const extension = path.extname(file.originalname);
        if (supportedImage.test(extension)) {
            cb(null, true);
        } else {
            cb(new Error("Must be a png/jpg image"));
        }
    },
    limits: {
        fileSize: 5000000,
    }
});

module.exports = uploader;
