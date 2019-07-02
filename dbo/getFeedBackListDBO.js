var feedBackSchema = require("../models/feedback.model");
exports.getFeedBackListDBO = (data, cb) => {
  feedBackSchema.find(data, (error, response) => {
    if (!error) {
      cb(null, response);
    } else {
      cb(error, null);
    }
  });
};
