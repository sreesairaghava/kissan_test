const mongoose = require("mongoose");

const subScriberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  subscribedChannel: {
    type: String,
    required: true
  },
  subScribedDate: {
    type: Date,
    required: true,
    default: Date.now
  }
});

//exporting schema
module.exports = mongoose.model("Subscriber", subScriberSchema);
