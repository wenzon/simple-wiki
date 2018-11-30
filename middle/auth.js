const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});

passport.use('signup', new LocalStrategy({ 
    usernameField: 'username',    
    passwordField: 'password'
  },
  function(username, password, done){
	var user = {
        id: '1',
        username: config.username,
        password: config.password
    };
		
	if (username !== user.username || password !== user.password) {
		return done(null, false, { message: 'Incorrect username.' });
	}

	return done(null, user);
}));