const express       = require('express'),
      _             = require("lodash"),
      fse           = require("fs-extra"),
      router        = express.Router(),
      {mongoose}    = require("../db/mongoose-config");


// --- Serve root route ---//
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
    res.redirect("/questionnaire");
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
    res.redirect("/questionnaire");
  }
});


module.exports = router;
