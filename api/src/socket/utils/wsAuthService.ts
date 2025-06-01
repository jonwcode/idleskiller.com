import { Socket } from "socket.io";
import { activeSessions } from "@socket/socket.js";
import Database from "@db";

// A global map to store socket instances

class WSAuthService {
	private db: Database;

	constructor() {
		this.db = new Database(); // Initialize the database connection
	}

	// Get the socket instance using a socket ID
	private getSocket(socketId: string): Socket | undefined {
		return activeSessions.get(socketId);
	}

	async authenticate(
		socketId: string, // Pass socket ID instead of the entire object
		renewToken: boolean = true
	) {
		const data = activeSessions.get(socketId);

		console.log(data, "from the data object");

		const { deviceType, osName, osBuildId } = data.deviceInfo;

		if (data.token && deviceType && osBuildId && osName) {
			const query = await this.db.query("SELECT * FROM `tokens` WHERE token = ?", [
				data.token,
			]);

			if (query.length === 1) {
				const userAgent = query[0].userAgent;

				if (
					userAgent.deviceType === deviceType &&
					userAgent.osName === osName &&
					userAgent.osBuildId === osBuildId
				) {
					// if (renewToken) this.renewToken(data.token, socketId);

					return { success: true };
				}
			}
		}

		// return { success: false };
	}

	// async renewToken(socketId: string) {
	// 	const socket = this.getSocket(socketId);
	// 	if (socket) {
	// 		socket.emit("tokenRenewed", { token });
	// 		console.log("Token renewed for socket:", socket.id);
	// 	} else {
	// 		console.log("Socket not found for:", socketId);
	// 	}
	// }
}

// Function to add socket to the map when a new connection is made
// export function registerSocket(socket: Socket) {
// 	socketMap.set(socket.id, socket);
// 	console.log(`Socket registered: ${socket.id}`);

// 	socket.on("disconnect", () => {
// 		socketMap.delete(socket.id);
// 		console.log(`Socket removed: ${socket.id}`);
// 	});
// }

export default WSAuthService;
