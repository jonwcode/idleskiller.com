import { Socket } from "socket.io";
import { activeSessions } from "@socket/socket";
import DeviceInfo from "@utils/deviceInfo.js";
import * as cookie from "cookie";
import WSAuthService from "@socket/utils/wsAuthService.js";

async function RegisterDeviceHandler(socket: Socket) {
	const userAgent = socket.handshake.headers["user-agent"];
	const rawCookie = socket.handshake.headers["cookie"];
	const cookies = rawCookie ? cookie.parse(rawCookie) : {};
	const authService = new WSAuthService();

	const deviceInfo = DeviceInfo(userAgent);

	console.log(socket.id);

	activeSessions.set(socket.id, {
		token: cookies.token ? cookies.token : null,
		deviceInfo: { ...deviceInfo },
	});

	// Check to see if this player has a token
	// Try and verify the token
	const token = cookies.token;

	// console.log(userAgent);

	if (cookies.token) await authService.authenticate(socket.id);

	let playerInfo = {
		deviceInfo: { ...deviceInfo },
		player_id: null,
		characterName: null,
		token: cookies.token ? cookies.token : "",
	};

	socket.on("disconnect", () => {
		activeSessions.delete(socket.id);
	});
}

export default RegisterDeviceHandler;
