const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = require('mongodb').ObjectID;
const DomainSchema = new Schema({
  domain: {
    type: String,
  },
});
module.exports = mongoose.model('domain', DomainSchema);
