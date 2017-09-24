const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');
// user here refers to the new user created or old user retrieved from db
passport.serializeUser((user, done) => {
	done(null, user.id); // user.id refers to unique _id generated in db
});

// id here refers to _id from db
passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true
		},
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ googleId: profile.id }).then(existingUser => {
				if (existingUser) {
					console.log('user already exists!');
					done(null, existingUser); // done(error, returningObject)
				} else {
					new User({
						googleId: profile.id
					})
						.save()
						.then(user => {
							done(null, user);
						});
				}
			});
			console.log('profile: ', profile);
		}
	)
);
