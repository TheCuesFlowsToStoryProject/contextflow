const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ContextFlowSchema = new Schema({
  contexts: {
    atttentionentities: {
      type: Array,
      default: [],
    },
    domain: {
      type: String,
    },
    flow: {
      type: String,
    },
    FlowAnchor: {
      type: String,
    },
    DomainAnchor: {
      type: String,
    },
    UserAnchor: {
      type: String,
    },
    EntityAnchor: {
      type: String,
    },
    contexttype: {
      type: String,
    },
    owner: {
      type: String,
    },
  },
});
ContextFlowSchema.index(
  { "contexts.UserAnchor": 1, "contexts.domain": 1, "contexts.flow": 1 },
  { unique: true }
);
ContextFlowSchema.index(
  { "contexts.domain": 1, "contexts.atttentionentities": 1 },
  { unique: true }
);
module.exports = mongoose.model("context", ContextFlowSchema);
