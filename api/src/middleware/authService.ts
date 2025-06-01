import { Response, Request } from "express";
import password_hash from "@utils/password_hash.js";
import Database from "@db";
import { LogMessages, type severityTypes, type detailsType } from "@ts/authService.js";
import generateToken from "@utils/generateToken";
import { setCookie } from "@utils/cookie.js";
import password_verify from "@utils/password_verify.js";

/**
 * AuthService class provides methods for user authentication, registration, and logging system messages.
 */
class AuthService {
	// Class Gloabal Variables
	private db: Database;
	private emailRegex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	private userRegex = /^(?!admin\b)[A-Za-z0-9]+(?:\.[A-Za-z0-9]+)*$/;

	constructor() {
		this.db = new Database(); // Initialize the database connection
	}

	async checkAva(field: string, value: string) {
		if (!field || !value) return false;

		const fieldName = field == "player" ? "player" : "email";

		const sql = `SELECT * FROM players WHERE ${fieldName} = ?`;
		const query = await this.db.query(sql, [value]);
		const rows = query;

		return rows;
	}

	async login(username: string, password: string) {
		// Implement login logic here
	}

	/**
	 * Logs system messages with varying severity levels.
	 *
	 * @param {LogMessages} message - The message to log.
	 * @param {number} player_id - The ID of the user associated with the log message.
	 * @param {Request} req - The request object to extract additional information like IP address.
	 *
	 * @returns {Promise<void>}
	 */
	async systemLogs(
		message: LogMessages,
		player_id: number,
		req: Request,
		additionalDetails: detailsType | boolean = false
	) {
		// Check to see what type of message is being logged
		// Rate the severity based on the message

		let msgSeverity: severityTypes = null;

		switch (message) {
			case "Login":
				msgSeverity = "info";
				break;
			case "LoggedOut":
				msgSeverity = "info";
				break;
			case "FailedLoginAttempt":
				msgSeverity = "warning";
				break;
			case "NewAccountCreated":
				msgSeverity = "info";
				break;
			case "PasswordChanged":
				msgSeverity = "info";
				break;
			case "UnauthorizedAction":
				msgSeverity = "alert";
				break;
			case "500OrPageError":
				msgSeverity = "alert";
				break;
			case "HackAttempt":
				msgSeverity = "hackAttempt";
				break;
			default:
				msgSeverity = "info";
				break;
		}

		let hackDetails;
		if (msgSeverity === "hackAttempt") {
			// Get some extra info for more context
			const error = new Error();
			const stack = error.stack?.split("\n")[2] || ""; // Get the caller line from the stack

			// Extract file name and line number
			const match = stack.match(/\((.*):(\d+):(\d+)\)/);
			const filePath = match ? match[1] : "Unknown File";
			const lineNumber = match ? match[2] : "??";
			const columnNumber = match ? match[3] : "??";

			const unixTimestamp = Math.floor(new Date().getTime() / 1000);

			hackDetails = JSON.stringify({
				details: {
					filePath,
					lineNumber,
					columnNumber,
					timestamp: unixTimestamp,
					windowNavigator: req.headers["user-agent"],
				},
			});
		}

		// Get the IP address of the user
		const ipaddr = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

		this.db.insert("systemLogs", {
			message: message,
			player_id: player_id,
			severity: msgSeverity,
			ip_addr: ipaddr,
			additional_details:
				msgSeverity === "hackAttempt"
					? hackDetails
					: additionalDetails
					? JSON.stringify(additionalDetails)
					: "",
		});
	}

	/**
	 * Registers a new user with the provided username, password, email, and avatar.
	 *
	 * @param {Object} body - The request body containing user registration details.
	 * @param {string} body.username - The username of the new user.
	 * @param {string} body.password - The password of the new user.
	 * @param {string} body.email - The email address of the new user.
	 * @param {string} body.avatar - The avatar image file name for the new user.
	 * @param {Response} res - The response object to send the result of the registration.
	 *
	 * @returns {Promise<void>}
	 */

	/**
	 * 	Register new user
	 *
	 * @async
	 * @param {{
	 * 			username: string;
	 * 			password: string;
	 * 			email: string;
	 * 			avatar: string;
	 * 			device: { deviceType: string; osName: string; osBuildId: string };
	 * 		}} body
	 * @param {Response} res
	 * @param {Request} req
	 * @returns {*}
	 */
	async register(
		body: {
			username: string;
			password: string;
			email: string;
			avatar: string;
			device: { deviceType: string; osName: string; osBuildId: string };
		},
		res: Response,
		req: Request
	) {
		const { username, password, email, avatar, device } = body;

		// List of currently available avatars
		const avatars = [
			"male1.png",
			"male2.png",
			"male3.png",
			"male4.png",
			"male5.png",
			"male6.png",
			"female1.png",
			"female2.png",
			"female3.png",
			"female4.png",
			"female5.png",
			"female6.png",
		];

		// Validate the input data on server side

		if (
			!username.match(this.userRegex) ||
			!email.match(this.emailRegex) ||
			password.length < 8 ||
			!avatars.includes(avatar)
		) {
			res.status(400).json({ error: "Invalid input data" });
			return;
		}

		// Check if the username or email is already in use

		const checkUsername = await this.checkAva("player", username);
		const checkEmail = await this.checkAva("email", email);

		if (checkUsername.length > 0 || checkEmail.length > 0) {
			res.status(400).json({ error: "Username or email already in use" });
			return;
		}

		// Insert the new user into the database

		const hashedPassword = await password_hash(password);

		const query = await this.db.insert("players", {
			player: username,
			password: hashedPassword,
			email: email,
			avatar: avatar,
		});

		if (query.affectedRows > 0) {
			this.systemLogs("NewAccountCreated", query.insertId, req);

			// If they make it here, we need to log them in and
			// Inform expo that they are logged in as well

			const token = await this.createLoginRecord(query.insertId, device, res, req);

			// console.log(req.headers["user-agent"]);

			res.status(200).json({ success: true, token });
		} else {
			this.systemLogs("500OrPageError", query.insertId, req);
			res.status(500).json({ error: "Internal server error" });
		}
	}

	/**
	 * Validate User Login Credentials
	 *
	 * @async
	 * @param {*} body
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {unknown}
	 */
	async validateCredentials(body, req: Request, res: Response) {
		// See if we can find a match inside of the database
		// With this email and password

		const { email, password, deviceInfo } = body;
		// console.log(body);

		if (email.match(this.emailRegex) && password.length >= 8 && deviceInfo.length !== 0) {
			const emailQuery = await this.db.query("SELECT * FROM players WHERE email = ?", [
				email,
			]);

			// Now lets check to see if we get any results back
			// From the database
			if (emailQuery.length >= 1) {
				const { password: passHash, permissions, player_id } = emailQuery[0];

				if (await password_verify(password, passHash)) {
					// Make sure this account hasn't been locked
					// as well

					if (permissions >= 1) {
						this.systemLogs("Login", player_id, req);
						return { status: 1, player_id, deviceInfo };
					} else {
						// Else if the users account is locked
						this.systemLogs("FailedLoginAttempt", player_id, req, {
							details: "Account Locked",
						});
						return { status: 2 };
					}
				} else {
					// If the password is just Invalid
					this.systemLogs("FailedLoginAttempt", player_id, req);
					return { status: 0 };
				}
			} else {
				// No match found
				await this.systemLogs("FailedLoginAttempt", 0, req, {
					details: `Email used: ${email}`,
				});
				return { status: 0 };
			}
		} else {
			// Invalid request, possible hack hackAttempt
			this.systemLogs("HackAttempt", 0, req);
			return { status: 0 };
		}
	}

	async logout() {
		// Implement logout logic here
	}

	/**
	 * Create Login Record
	 *
	 * @async
	 * @param {number} user_id
	 * @param {{ deviceType: string; osName: string; osBuildId: string }} device
	 * @param {Response} res
	 * @param {Request} req
	 * @returns {unknown}
	 */
	async createLoginRecord(
		player_id: number,
		device: { deviceType: string; osName: string; osBuildId: string },
		res: Response,
		req: Request
	) {
		const expire_time = Math.floor(new Date().getTime() / 1000) + 604800;
		const token = await generateToken(50);

		// One token per player. Account can only be logged in through one device
		// So delete all tokens for this user

		await this.db.query("DELETE FROM `tokens` WHERE player_id = ?", [player_id]);

		// Get the device information, if not null
		const userAgent = JSON.stringify({
			deviceType: device.deviceType,
			osName: device.osName,
			osBuildId: device.osBuildId,
		});

		// We need to double check to see if there is any

		this.db.insert("tokens", { token, player_id, userAgent, expire_time });

		// Set the token cookie
		await setCookie("token", token, res, req);

		return token;
	}

	async getPlayer() {
		// Implement get user logic here
	}

	async authenticate(
		body: {
			vts: string; // Verify Token Status
			deviceType: string;
			osName: string;
			osBuildId: string | null;
		},
		req: Request,
		res: Response
	) {
		const token = req.cookies.token;
		if (token && body.deviceType && body.osBuildId && body.osName) {
			// See if we can find a match for this token
			const { deviceType, osName, osBuildId } = body;

			const query = await this.db.query("SELECT * FROM `tokens` WHERE token = ?", [token]);

			if (query.length === 1) {
				// Since we got a match for this token, lets validate
				// And make sure it's coming from the original device
				// console.log(query[0]);
				const userAgent = query[0].userAgent;

				if (
					userAgent.deviceType === deviceType &&
					userAgent.osName === osName &&
					userAgent.osBuildId === osBuildId
				) {
					// If this token is valid, then go ahead and renew it
					this.renewToken(token, res, req);
				}
			} else {
				res.status(200).json({ success: false });
			}
		} else {
			res.status(200).json({ success: false });
		}
	}

	async renewToken(identifier: string | number, res: Response, req: Request) {
		// Do some basic cleanup.
		// Find any expired tokens from this user
		// and remove them
		const timestamp = Math.floor(new Date().getTime() / 1000);
		const identifierCondition = typeof identifier === "string" ? `token = ?` : `user_id = ?`;

		const deleteQuery = await this.db.query(
			`DELETE FROM tokens WHERE expire_time <= ? AND ${identifierCondition}`,
			[timestamp, identifier]
		); // Removes all expired tokens

		const expire_time = Math.floor(new Date().getTime() / 1000) + 604800;
		const new_token = await generateToken(50);

		await setCookie("token", new_token, res, req);

		// Update the token as well as the cookie
		const query = await this.db.update(
			"tokens",
			{ token: new_token },
			{ token: identifier, expire_time: [">=", timestamp] },
			true
		);

		res.status(200).json({ success: true });
	}
}

export default AuthService;
