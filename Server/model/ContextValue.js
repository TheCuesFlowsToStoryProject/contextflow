const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = require("mongodb").ObjectID;
const ContextValueSchema = new Schema(
  {
    _id: { type: String },
    contextvalue: [{}],
  },
  { versonkey: false }
);
module.exports = mongoose.model("contextvalue", ContextValueSchema);
