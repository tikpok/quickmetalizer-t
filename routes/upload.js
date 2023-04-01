const multer  = require('multer');
const crypto = require("crypt")
const path = require('path')

const storage = multer.memoryStorage();

/* multer.diskStorage({
  destination(req, file, callback) {
    callback(null, path.resolve(__dirname, "../uploads"));
  },
  filename(req, file, callback) {
    const randomBytes = crypto.randomBytes(16).toString('hex');
    const fileName = `${randomBytes}-${file.originalname}`;
    callback(null,fileName);
  },
});
*/
const upload = multer({
   storage,
    fileFilter(req, file, callback) {
      console.log(file.mimetype)
      if (["video/mp4", "image/gif", "image/jpeg","image/png","audio/mpeg","text/plain","application/pdf"].includes(file.mimetype)) {
        callback(null, true);
        return;
      }
      callback(new TypeError("Invalid File Type"));
     },
  });


  module.exports = upload;