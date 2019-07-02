var mongoose = require("mongoose");

var feedSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now()
  },
  feedBackType: {
    type: String,
    default: "Public Comment"
  },
  likes: {
    type: Number,
    default: 0
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  correspondingMessage: {
    type: Array,
    trim: true
  },
  notify: {
    type: String,
    trim: true
  },
  assignedPerson: {
    type: String,
    default: "none",
    trim: true
  },
  resolve: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model("Feedback", feedSchema);
