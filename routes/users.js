const passport = require('passport')
const express = require('express');
const router = express.Router();

router.post('/account/signup',
    passport.authenticate('signup', {
        successRedirect:'/edit',
        failureRedirect:'/login'
	})
);

router.post('/account/signout', function(req, res){
  req.logout();
  res.redirect('/login');
});

module.exports = router;