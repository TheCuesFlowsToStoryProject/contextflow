const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ContextValueSchema = new Schema({
  _id: { type: String },
  contextvalue: {
    type: Object,
    default: {},
  },
});
module.exports = mongoose.model("value", ContextValueSchema);
