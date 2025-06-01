import Database from "@db";
import AuthService from "@middleware/authService";
import { Request, Response } from "express";

/** Check Available Controller
 *
 *	Check to see if the username and or
 *  The email address is available
 *
 * @async
 * @param {*} req
 * @param {*} res
 * @returns {*}
 */
export const checkAva = async (req, res) => {
	const db = new Database();
	const player = req.query.player || null;
	const email = req.query.email || null;

	if (!player && !email) {
		res.status(404).json({});
		return;
	}

	const authService = new AuthService();
	const rows = await authService.checkAva(player ? "player" : "email", player ? player : email);

	const data = {
		numRows: rows.length === undefined ? 0 : rows.length,
	};

	res.json(data);
};

/**  Register Controller
 *
 *	Register a new player
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {void}
 */
export const register = async (req: Request, res: Response) => {
	const body = req.body || null;

	const authService = new AuthService();
	authService.register(body, res, req);
};

export const verifyToken = async (req: Request, res: Response) => {
	const body = req.body ?? null;

	// if (!body.token || typeof body.token !== "string") {
	// 	res.status(404).json({});
	// 	return;
	// }

	const authService = new AuthService();

	authService.authenticate(body, req, res);
};

export const login = async (req: Request, res: Response) => {
	const body = req.body ?? null;

	if (body !== null) {
		const authService = new AuthService();

		// Validate the email address and password

		const results = await authService.validateCredentials(body, req, res);

		const { status, deviceInfo, player_id } = results;

		// If results.success returns true, then we have a valid user
		// Create a new token

		if (status === 1) {
			// Successful login attempt
			const { player_id, deviceInfo } = results;
			await authService.createLoginRecord(player_id, deviceInfo, res, req);

			res.status(200).json({ success: true });
		} else if (status === 0) {
			// Failed Login Attempt
			res.status(200).json({ success: false });
		} else if (status === 2) {
			// Account Locked
			res.status(200).json({ locked: true });
		}

		console.log(results);
	}
};
