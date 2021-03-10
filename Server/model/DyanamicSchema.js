const Express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Anchors = {};
var method = {
  DynamicSchema: function (collection_name) {
    var AnAnchorSchema = new Schema(
      {
        anchor: {type: String},
      },
      {strict: false}
    );
    return mongoose.model(collection_name, AnAnchorSchema);
  },
  getAnchorModel: function (collection_name) {
    if (!Anchors[collection_name]) {
      Anchors[collection_name] = new method.DynamicSchema(collection_name);
    }
    return Anchors[collection_name];
  },
};

exports.data = method;
