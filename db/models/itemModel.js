const mongoose = require('mongoose'),
      random   = require('mongoose-random');


var ItemSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  inverted: {
    type: String,
    required: true,
  }
},
{
  timestamps: true
});

ItemSchema.plugin(random, {path: "r"});

var Item = mongoose.model("Item", ItemSchema);

module.exports = {ItemSchema, Item};
