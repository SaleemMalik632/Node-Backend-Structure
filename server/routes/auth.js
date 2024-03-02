const router = require("express").Router();
const passport = require("passport");
const User = require("../model/user");




router.get("/login/success", (req, res) => {
	if (req.user) {
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});

	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});
router.get("/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});
// Route for local login and registration
router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/failurepage' }))
router.get('/checksession', (req, res) => {
	if (req.session.passport) {
		res.send({ message: 'Session exists', user: req.session.passport.user });
	} else {
		res.send('Session does not exist');
	} 
}); 
router.post("/register", (req, res) => {
	try {
		const { username, email, password } = req.body;
		console.log(req.body);
		const newUser = new User({ username, email, password });
		newUser.save()
			.then(() => {
				res.status(200).send('User created');
			})
			.catch((err) => {
				console.error('Error occurred during registration:', err);
				res.status(500).send('Internal server error');
			});
	} catch (err) {
		console.error('Error occurred during registration:', err);
		res.status(500).send('Internal server error');
	}
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));
router.get("/google/callback", passport.authenticate("google", {
	successRedirect: 'http://localhost:3000',
	failureRedirect: "http://localhost:3000/login/failed",
}));
router.get("/logout", (req, res) => {
	req.logout();
	console.log("Logged out"); // Log out the user
	res.redirect("http://localhost:3000"); // Redirect to the home page of your React app
});

// get api to get all the user 
router.get("/getalluser", async (req, res) => {
	try {
		const user = await User.find();
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

module.exports = router;
