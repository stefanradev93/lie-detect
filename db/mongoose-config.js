const mongoose = require("mongoose")
      config   = require("../config");

// --- Use built-in promise library --- //
mongoose.Promise = global.Promise;

// --- Connect to database --- //
mongoose.connect(config.MONGODB_URI, {
  useMongoClient: true
})
.then(() => {
  console.log(`MongoDB server running at ${config.MONGODB_URI}...`);
}, (e) => {
  console.log("Could not connect to database:", e);
});

module.exports = {mongoose};
