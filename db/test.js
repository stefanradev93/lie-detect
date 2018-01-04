const mongoose = require("mongoose")
      config   = require("../config"),
      {Item}   = require("./models/itemModel");

// --- Use built-in promise library --- //
mongoose.Promise = global.Promise;

// --- Connect to database --- //
mongoose.connect(config.MONGODB_URI, {
  useMongoClient: true
})
.then(() => {
  console.log(`MongoDB server running at ${config.MONGODB_URI}...`); 
  let item = {"content":"Ich bin ein aktiver Mensch","inverted":"Ich bin ein träger Mensch"};
  let dbItem = Item(item);
  dbItem.save();
}, (e) => {
  console.log("Could not connect to database:", e);
});
