import { Server as SocketIOServer } from "socket.io";
import { Server as HTTPServer } from "http";
import { instrument } from "@socket.io/admin-ui";
import RegisterPlayer from "@socket/registerPlayer.js";
import { Socket } from "dgram";

const activeSessions = new Map<string, any>(); // Store device info per socket ID

let io: SocketIOServer | null = null;
let resolveIO: ((io: SocketIOServer) => void) | null = null;

const ioPromise = new Promise<SocketIOServer>(resolve => {
	resolveIO = resolve;
});

export function WebSocketServer(server: HTTPServer): SocketIOServer {
	if (!io) {
		io = new SocketIOServer(server, {
			cors: {
				origin: "https://app.idleskiller.com",
				credentials: true,
				methods: ["GET", "POST"],
			},
		});

		// io.use((socket, next) => {
		// 	// Verify the token
		// });

		io.on("connection", client => {
			console.log(`New WebSocket connection: ${client.id}`);

			RegisterPlayer(client);

			client.on("logout", () => {
				client.emit("loggedOut", "You have been logged out from the server");
			});
			// // Listen for device registration
			// socket.on("registerDevice", deviceInfo => {
			// 	if (!deviceInfo) {
			// 		console.warn(`Received empty device info from ${socket.id}`);
			// 		return;
			// 	}
			// 	activeSessions.set(socket.id, deviceInfo);
			// 	console.log(`Device registered for ${socket.id}:`, deviceInfo);
			// });

			// // Listen for disconnects
			// socket.on("disconnect", () => {
			// 	activeSessions.delete(socket.id);
			// 	console.log("User disconnected:", socket.id);
			// });
		});
		if (resolveIO) instrument(io, { auth: false });
		if (resolveIO) resolveIO(io);
	}

	return io; // Return the io instance if needed elsewhere
}

function getSocket(): Promise<SocketIOServer> {
	return io ? Promise.resolve(io) : ioPromise;
}

export { getSocket, activeSessions };
