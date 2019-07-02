var { getFeedBackList } = require("./getFeedBackList.controllers");
var { postFeedBackMessages } = require("./placeFeedBackMessages.controllers");
var { updateFeedBackItem } = require("./updateFeedBackItem.controllers");
module.exports = {
  getFeedBackList: getFeedBackList,
  postFeedBackMessages: postFeedBackMessages,
  updateFeedBackItem: updateFeedBackItem
};
