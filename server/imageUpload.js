const path = require("path");
const aws = require('aws-sdk');
const multer = require("multer");
const multerS3 = require('multer-s3');
const config = require('./config');

// AWS S# credentials
const s3 = new aws.S3({
  accessKeyId: config.AWS_ACCESSKEY,
  secretAccessKey: config.AWS_SECRETKEY,
  Bucket: config.AWS_BUCKET
});

// uploads file and renames with orignial file name and appends time of upload to file name
// returns the url of file
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.AWS_BUCKET,
    acl: 'public-read',
    key: function (req, file, cb) {
      console.log("Multer API: ", file)
      cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
    }
  })
});

module.exports = upload;