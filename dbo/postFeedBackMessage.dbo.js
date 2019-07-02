let FeedBackSchema = require("../models/feedback.model");
exports.postFeedBackMessageDBO = (data, cb) => {
  //   let response = JSON.stringify(data);
  // console.log("inside");
  let Save = new FeedBackSchema(data);
  Save.save((err, resp) => {
    if (!err) {
      cb(null, true);
    } else {
      cb(err, null);
    }
  });
};
