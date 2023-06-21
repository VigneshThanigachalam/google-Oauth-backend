import express from "express";
import passport from "passport";
import dotenv from "dotenv";

dotenv.config();
export const router = express.Router();

router.get("/login/success", (req, res) => {
	if (req.user) {
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});
	} else {
		res.json({ error: true, message: "Not Authorized" });
	}
});

router.get("/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});
router.get("/google/callback",
	passport.authenticate("google", {
		successRedirect: process.env.CLIENT_URL,
		failureRedirect: "/login/failed",
	})
);
console.log(process.env.CLIENT_URL);
router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get("/logout", (req, res) => {
	req.logout((err) => {
		if (err) { return next(err); }
		res.redirect(process.env.CLIENT_URL);
	});
});
