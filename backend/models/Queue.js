const mongoose = require("mongoose");

const queueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  users: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Queue", queueSchema);
