import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import PublicRoutes from "./routes/public.js";
import SecureRoutes from "./routes/secure.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import AuthService from "@middleware/authService.js";
import { createServer } from "http"; // Import HTTP module
import { WebSocketServer } from "@socket/socket.js";
import DeviceInfo from "@utils/deviceInfo.js";

async function startServer() {
	// Load environment variables
	dotenv.config({
		path: ".env",
	});

	// Initialize Express app
	const app = express();
	const server = createServer(app); // Create an HTTP server
	const authService = new AuthService();

	// Configure Express settings and middleware
	app.set("trust proxy", 1);
	app.use(
		cors({
			origin: "https://app.idleskiller.com", // Allow frontend origin
			credentials: true, // Allow cookies
		})
	);
	app.use(cookieParser());
	app.use("*", (req: Request, res, next) => {
		// Custom Request variables
		const userAgent = req.get("user-agent");
		req.deviceInfo = DeviceInfo(userAgent);
		console.log(req.ip, req.deviceInfo);
		next();
	});
	app.use(bodyParser.json({ limit: "20mb" }));
	app.use(PublicRoutes);
	app.use(SecureRoutes);

	WebSocketServer(server);
	// Start the combined HTTP + WebSocket server
	const PORT = process.env.PORT || 3000;
	server.listen(PORT, () => {
		console.log(`Server is now running on port ${PORT}`);
	});
}

startServer();
