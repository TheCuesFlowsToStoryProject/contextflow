const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ContextFlowSchema = new Schema({
  contexts: {
    type: Object,
    default: {},
  },
});
module.exports = mongoose.model('context', ContextFlowSchema);
