const dbo = require("../dbo");
exports.getFeedBackList = function(req, res) {
  dbo.getFeedBackListDBO({ __v: 0 }, (err, resp) => {
    if (!err) {
      res.status(200).json({ result: resp, success: true });
    } else {
      res.status(400).json({
        result: [],
        message: "Internal server Error,please try again",
        success: false
      });
    }
  });
};
