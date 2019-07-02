var FeedbackSchema = require("../models/feedback.model");
var update = require("update-immutable").default;

exports.updateFeedBackDBO = (id, data, cb) => {
  // console.log("data inside the update", id, data);
  FeedbackSchema.findById({ _id: id }, (error, response) => {
    if (!error) {
      let userData = data;
      updateResult(id, response, userData, (error, result) => {
        if (!error) {
          // console.log("repsonse inside", response);
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

function updateResult(id, data, userData, cb) {
  console.log("data inside the updateResult 1", data, userData);
  let result = update(data, { $merge: { feedBackType: 'Team Comment'} });
  console.log("new response 2222222222222", result);
  FeedbackSchema.findByIdAndUpdate(
    { _id: id },
    { $set: { result } },
    { new: true },
    (error, updated) => {
      if (!error) {
        console.log("response inside the fucntion", updated);
        cb(null, true);
      } else {
        cb({
          message: "Error while updating the feedback message, please try again"
        });
      }
    }
  );
}
