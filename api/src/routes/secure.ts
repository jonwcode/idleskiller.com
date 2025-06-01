import express from "express";
import { activeSessions } from "socket/socket";

const Router = express.Router();

Router.get("/logout", (req, res) => {
	// console.log(activeSessions);
});

export default Router;
