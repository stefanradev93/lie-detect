const mongoose           = require('mongoose'),
      {ItemSchema, Item} = require("./itemModel"),
      jwt                = require("jsonwebtoken"),
      config             = require("../../config");
      path               = require('path');

// --- Create the item schema --- //
var ResponseSchema = mongoose.Schema({
  item: {
    type: String,
    required: true
  },
  response: {
    required: true,
    type: Number,
    max: 2,
    min: -2
  },
  recorded: {
    type: String,
    required: false,
    default: "NA"
  },
  label: {
    type: Boolean,
    required: false
  },
  wav: {
    type: String,
    default: "NA",
    required: false
  }
},
{
  timestamps: true
});

// --- Create the User Schema --- //
var UserSchema = mongoose.Schema({
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: Number,
    required: true,
  },
  education: {
    type: String,
    required: true
  },
  language: {
    type: Number,
    required: true
  },
  responses: [ResponseSchema],
  items: [ItemSchema],
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
},
{
  timestamps: true
});

UserSchema.methods.generateAuthToken = function() {
  // Custom instance method to generate a token
  let user = this;
  let access = "auth";
  let token = jwt.sign({_id: user._id.toHexString(), access},
                        config.TOKENSECRET).toString();
  user.tokens.push({access, token});
  // Return a value which will be passed as the success value to the next then call
  return user.save().then(() => {
    return token;
  });
};

UserSchema.methods.generateRandomSequence = function() {
  // Custom instance method ot generate a random sequence of items
  let user = this;
  // Create a random item sequence
  return Item.findRandom().exec().then((randomizedItems) => {
    user.items = randomizedItems;
    return user.save().then(() => {
      return user;
    });
  });
};

UserSchema.methods.getNextItem = function() {
  // Returns the last question and removes it from the list of questions of
  // current user
  let user = this;
  // get current item while removing it from list
  let item = user.items.pop();
  // Store updated item list and return user
  return user.save().then(() => {
    return item;
  });
};

UserSchema.methods.removeToken = function(token) {
  // Removed the token from the user entry,
  // meaning the experiment is over, or user hast exited
  let user = this;
  return user.update({
    $pull: {
      tokens: {token}
    }
  });
};

UserSchema.methods.addResponseWithWav = function(body) {
  // Pushes a new response to the user's list of
  // responses and returns the path to the wav file
  // the backend is then responsible for creatign the wav
  let user = this;
  // Create the new response (assumes body contains the correct fields)
  let resp = new Response(body);
  // Define the name and add the path
  let wavName = resp._id.toString() + "_" + resp.label + '.wav';
  let folderName = user._id.toString();
  resp.wav = path.join(__dirname, "..", "..", "data", folderName, wavName);
  // Add to user list of responses and save
  user.responses.push(resp);
  user.save();
  return resp.wav;
};

UserSchema.methods.addResponse = function(body) {
  // Assumes body contains only item and response
  let user = this;
  // Create the new response (assumes body contains the correct fields)
  let resp = new Response(body);
  user.responses.push(resp);
  return user.save();
};

UserSchema.statics.findByToken = function(token) {
  // Returns the user with the given token
  var User = this;
  let decoded;
  try {
    // Try to decode a variable
    decoded = jwt.verify(token, config.TOKENSECRET);
  }
  catch(err) {
    console.log(err);
    return null;
    // handle error during decoding of the token
  }
  // Return a promise
  return User.findOne({
    // Query the token
    "_id": decoded._id,
    "tokens.token": token,
    "tokens.access": "auth"
  });
};

var User = mongoose.model("User", UserSchema);
var Response = mongoose.model("Response", ResponseSchema);

module.exports = {User, Response};
