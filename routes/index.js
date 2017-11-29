const express = require('express'),
      _       = require("lodash"),
      router  = express.Router();


// --- Serve root route ---//
dishRouter.route('/')
/* GET home page. */
.get((req, res, next) => {
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


// --- Create router --- //


























module.exports = router;
