var multer = require("multer");
const uuidv1 = require("uuid/v1");
var path = require("path");
var dbo = require("../dbo");
let fileDestination = path.join("uploads");
let fileName = uuidv1();
const storage = multer.diskStorage({
  destination: fileDestination,
  filename: function(req, file, cb) {
    cb(null, fileName + path.extname(file.originalname));
  }
});
const upload = multer({
  storage: storage,
  limits: { fieldSize: 5000000 },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single("image");

// check file type

function checkFileType(file, cb) {
  const fileTypes = /jpeg|jpg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb("Unsupported format, please try again");
  }
}

exports.postFeedBackMessages = function(req, res) {
  upload(req, res, err => {
    const {
      name,
      message,
      correspondingMessage,
      time,
      likes,
      notify,
      assignedPerson,
      resolve,
      feedBackType
    } = req.body;
    let data = {
      name,
      message,
      correspondingMessage,
      feedBackType,
      time: time === "" || time === "null" ? Date.now() : time,
      likes,
      notify,
      assignedPerson,
      resolve
    };
    if (err) {
      res.status(400).json({
        message: "Error while uploading the image, please try again" + err,
        success: false
      });
    } else {
      if (req.file) {
        let fileInformation = req.file.path.split("/")[1];
        data.image = fileInformation;
        dbo.postFeedBackMessageDBO(data, (error, resp) => {
          if (!error) {
            res.status(200).json({
              message: "Successfully inserted the feeback",
              success: true
            });
          } else {
            res.status(400).json({
              message: "Unsuccessful to insert, please try again" + error,
              success: false
            });
          }
        });
      } else {
        let fileInformation = "null";
        data.image = fileInformation;
        dbo.postFeedBackMessageDBO(data, (error, resp) => {
          if (!error) {
            res.status(200).json({
              message: "Successfully inserted the feeback",
              success: true
            });
          } else {
            res.status(400).json({
              message: "Unsuccessful to insert, please try again" + error,
              success: false
            });
          }
        });
      }
    }
  });
};
