const express          = require('express'),
      _                = require("lodash"),
      fse              = require("fs-extra"),
      config           = require('../config'),
      router           = express.Router(),
      multer           = require("multer"),
      upload           = multer(),
      {mongoose}       = require("../db/mongoose-config"),
      {User} = require("../db/models/userModel");


/* GET home page. */
router.get('/', (req, res, next) => {
  // The logic of the / GET is as follows:
  // We check whether there is an existing session,
  // if there is no, we render the registry form
  // else we redirect to the questionnaire, disallowing
  // multiple registries and going back to the index page
  if (_.isUndefined(req.session.userToken)) {
    res.render("index");
  }
  else {
    res.redirect("/experiment");
  }
});

/* GET register page. */
router.get('/register', (req, res, next) => {
  // The logic of the /register GET is as follows:
  // We check whether there is an existing session,
  // if there is no, we render the registry form
  // else we redirect to the questionnaire, disallowing
  // multiple registries and going back to registry form
  if (_.isUndefined(req.session.userToken)) {
    res.render("register");
  }
  else {
    res.redirect("/experiment");
  }
});

/* POST register page. */
router.post("/register", (req, res, next) => {
  // The logic of the post request goes as follows:
  // We check whether the session objetc contains
  // a user token. If this is the case, we create a
  // user in the database and redirect to the experiment
  // If there is already a token in the session object,
  // we simply redirect to the experiment
  if (_.isUndefined(req.session.userToken)) {
    // Extract data from body, if no session
    let body = _.pick(req.body, ["age", "education", "gender", "language"]);
    // Randomize sequence
    // Create user in database
    User.create(body)
    .then((user) => {
      // If user was succesfully created, generate a random seq of items
      return user.generateRandomSequence();
    })
    .then((user) => {
      // Generate an auth token for the session
      return user.generateAuthToken();
    })
    .then((token) => {
      req.session.userToken = token;
      res.header("x-exp-auth", token);
      res.redirect("/experiment");
    })
    .catch((err) => {
      next(err);
    });
  }
  // Session with user created, redirect to experiment
  else {
    res.redirect("/experiment");
  }
});

/* GET register page. */
router.get("/experiment", (req, res, next) => {
  // The logic of the /experiment /GET route is the following:
  // We check whether a session token exists or no
  // if there is a token, we render the questionnaire page
  // else we redirect to the main page
  if (_.isUndefined(req.session.userToken)) {
    res.redirect("/");
  }
  else {
    // Find current user by session token
    User.findByToken(req.session.userToken)
    .then((user) => {
      // Get next item in list (removes last item from list)
      user.getNextItem()
      .then((item) => {
        // Extract only content and inverted from item
        let itemStripped = _.pick(item, ["content", "inverted"]);
        // Render questionnaire page with current item
        res.render("experiment", {item: itemStripped});
      })
      .catch((err) => {
        console.log("Could not get next item: ", err);
      })
    })
    .catch((err) => {
      console.log("Could not find user by Token!", err);
      next(err);
    });
  }
});

/* POST upload */
router.post("/upload", upload.single("blob"), (req, res, next) => {

  // If there wasn't any recorded response
  if (_.isUndefined(req.body.recorded)) {
    // Extract onlt item and response
    var body = _.pick(req.body, ["item", "response"]);
    // Add to responses and end
    User.findByToken(req.session.userToken)
    .then((user) => {
      // User will automatically add response and decide whether to create a wav or not
      return user.addResponse(body)
    })
    .then(() => {
      // Simply set status and return
      res.status(200).send('Response uploaded!');
    })
    .catch((err) => {
      console.log('Could not upload:', err);
      res.status(401).send("Could not save!");
    });
  }
  // If there was a recorded response
  else {
    // Extract all aprameters and audio buffer
    var body = _.pick(req.body, ["item", "response", "recorded", "label"]);
    var {buffer} = _.pick(req.file, ["buffer"]);
    User.findByToken(req.session.userToken)
    .then((user) => {
      // User will automatically add response and decide whether to create a wav or not
      return user.addResponseWithWav(body)
    })
    .then((pathToWav) => {
      // Create the actual wav file, pathToWav is a string describing
      // the path to the wav file. It has the following form:
      // ./data/userId/respId.wav
      // Note that the folder is automatically created by fse by the first call
      return fse.outputFile(pathToWav, Buffer.from(new Uint8Array(buffer)));
    })
    .then(() => {
      res.status(200).send('Response uploaded!');
    })
    .catch((err) => {
      console.log('Could not upload:', err);
      res.status(401).send("Could not save!");
    });
  }
});

/* GET end of experiment */
router.get("/end", (req, res, next) => {
  // Redirect, if no token
  if (_.isUndefined(req.session.userToken)) {
    res.redirect("/");
  }
  else {
    // Find current user
    User.findByToken(req.session.userToken)
    .then((user) => {
      // Remove token from user meaning user is
      // no longer allowed to participate in this session
      return user.removeToken(req.session.userToken);
    })
    .then(() => {
      // Destroy session
      req.session.destroy();
      res.clearCookie(config.SESSION);
      res.render("debrief");
    })
    .catch((err) => {
      console.log("Failed to remove session", err);
      next(err)
    });
  }
});

module.exports = router;
