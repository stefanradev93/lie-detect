const mongoose = require('mongoose'),
      random   = require('mongoose-random');


const ItemSchema = mongoose.Schema({
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

const Item = mongoose.model("Item", ItemSchema);

module.exports = {ItemSchema, Item};
