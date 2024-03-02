const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const User = require("./model/user");
const passport = require("passport");

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: "/auth/google/callback",
			scope: ["profile", "email"],
		},
		function (accessToken, refreshToken, profile, callback) {
			return callback(null, profile);
		}
	)
);

passport.use(new LocalStrategy(
	async (username, password, done) => {
		console.log("Here inside local_strategy", username, password)
		try {
			let row1 = await User.findOne({ username: username })
			if (row1 == null) {
				console.log("NO RECORDS FOUND")
				return done(null, false)
			}
			else { //Record found
				console.log("Record found")
				console.log(row1)
				return done(null, row1)
			}
		}
		catch (err) {
			console.log("Some error here")
			return done(err)
		}
	}
));

passport.serializeUser((user, done) => {
	done(null, user.id); // stores the id<4kb
});

passport.deserializeUser((user, done) => {
	done(null, user);
});


module.exports = passport;