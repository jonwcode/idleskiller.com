import fs from "fs";
import https from "https";
import { WebSocketServer } from "ws";

const server = https.createServer({
	cert: fs.readFileSync("/etc/letsencrypt/live/api.idleskiller.com/fullchain.pem"),
	key: fs.readFileSync("/etc/letsencrypt/live/api.idleskiller.com/privkey.pem"),
});

const wss = new WebSocketServer({ server });

wss.on("connection", function connection(ws) {
	// Send a message to the client when it connects
	ws.send(JSON.stringify({ msg: "<span style='color: green;'>Connected...</span>" }));

	// Listen for messages from this client
	ws.on("message", message => {
		const messageString = message.toString();

		// Optionally broadcast to other clients
		wss.clients.forEach(client => {
			console.log("Log: " + messageString);
			if (client !== ws && client.readyState === WebSocket.OPEN) {
				client.send(messageString);
			}
		});
	});
});

server.listen(8081, () => {
	console.log("WebSocket server running on wss://your-domain.com:8081");
});
