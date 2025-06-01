import express from "express";
import { checkAva, register, verifyToken, login } from "@controllers/public.js";
import AuthService from "@middleware/authService";
import { LogMessages } from "@ts/authService";

const Router = express.Router();

// Verify Token
Router.post("/init", verifyToken);

Router.get("/init", (req, res) => {
	console.log(req.cookies);
	res.json(req.cookies);
});

// Check to see if the player or email is already in the database
Router.get("/checkAva", checkAva);

// Submit a new player to the database
Router.post("/signup", register);

// Log a user in

Router.post("/login", login);

// Send a 405 error if the user tries to access the signup page via GET
Router.get("/signup", (req, res) => {
	const authService = new AuthService();

	authService.systemLogs("HackAttempt", 0, req);

	res.status(405).json({ error: "Not found" });
});

export default Router;
