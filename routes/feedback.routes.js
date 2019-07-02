var router = require("express").Router();
var feedbackControllers = require("../controllers");

router.get("/feedback_list", feedbackControllers.getFeedBackList);
router.post("/feedback_messages", feedbackControllers.postFeedBackMessages);
router.put("/feedback_messages/:id/_update", feedbackControllers.updateFeedBackItem);

module.exports = router;
