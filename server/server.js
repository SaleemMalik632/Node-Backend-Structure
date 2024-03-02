require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/auth");
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const bodyParser = require('body-parser');
const Connection = require('./utlit/Conncection');
const app = express();
app.use(bodyParser.json());

app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);
app.use("/auth", authRoute);

const startServer = async () => {
	try {
		await Connection; // Wait for the database connection to be established
		const port = process.env.PORT || 8080;
		app.listen(port, () => {
			console.log(`Listening on port ${port}...`);
		});
	} catch (error) {
		console.error('Error connecting to MongoDB:', error);
	}
};
startServer();