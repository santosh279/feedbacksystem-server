var FeedbackSchema = require("../models/feedback.model");
var update = require("update-immutable").default;

exports.updateFeedBackDBO = (id, data, cb) => {
  FeedbackSchema.findById({ _id: id }, (error, response) => {
    if (!error) {
      let userData = data;
      updateResult(id, response, userData, (error, result) => {
        if (!error) {
          cb(null, response);
        } else {
          cb(error);
        }
      });
    } else {
      cb({
        message:
          "Error finding the feedback message, please try with valid feedback.",
        success: false
      });
    }
  });
};

function updateResult(id, currentData, userData, cb) {
  // console.log("data inside the updateResult 1", id, currentData, userData);
  let result = update(currentData, { $merge: userData });
  // console.log("new response 2222222222222", result);
  FeedbackSchema.findOneAndUpdate(
    { _id: id },
    { $set: result },
    { new: true },
    (error, response) => {
      if (error) {
        // console.log(error);
        cb({ message: "Internal server error, please try again" });
      } else {
        cb(null, true);
      }
    }
  );
}
