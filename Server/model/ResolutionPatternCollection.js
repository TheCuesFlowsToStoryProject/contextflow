const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ResolutionPatternSchema = new Schema({
  user_anchor: {
    type: String,
    required: true,
    index: true,
  },
  resolution_pattern: {
    type: String,
    required: true,
  },
  domain_anchor: {
    type: String,
    required: true,
  },
  flow_anchor: {
    type: String,
    required: true,
  },
});

ResolutionPatternSchema.index(
  { user_anchor: 1, resolution_pattern: 1, domain_anchor: 1, flow_anchor: 1 },
  { unique: true }
);
module.exports = mongoose.model(
  "ResolutionPatternCollection",
  ResolutionPatternSchema
);
