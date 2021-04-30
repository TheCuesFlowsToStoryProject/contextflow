const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const WordPhraseSchema = new Schema({
  wp: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("WordPhrase", WordPhraseSchema);
