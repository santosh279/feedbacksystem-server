var dbo = require("../dbo");
exports.updateFeedBackItem = (req, res) => {
  let id = req.params.id;
  let data = req.body.data;
  // console.log(data)
  dbo.updateFeedBackDBO(id, data, (error, response) => {
    if (!error) {
      res.status(200).json({ message: "Successfully updated.", success: true });
    } else {
      res.status(400).json({ message: error.message, success: false });
    }
  });
};
