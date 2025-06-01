// // src/logging.js
// const setupWebSocketLogging = () => {
// 	const originalConsole = { ...console }; // Preserve original console methods
// 	const socket = new WebSocket("wss://api.idleskiller.com:8081");

// 	socket.onopen = () => {
// 		console.log("WebSocket connection established for logging.");
// 	};

// 	const sendLog = (level, args) => {
// 		const logMessage = {
// 			level,
// 			message: args
// 				.map(arg => (typeof arg === "object" ? JSON.stringify(arg) : arg))
// 				.join(" "),
// 			timestamp: new Date().toISOString(),
// 		};
// 		if (socket.readyState === WebSocket.OPEN) {
// 			socket.send(JSON.stringify(logMessage));
// 		}
// 	};

// 	["log", "warn", "error", "info", "debug"].forEach(method => {
// 		console[method] = (...args) => {
// 			sendLog(method, args); // Send log to WebSocket
// 			originalConsole[method](...args); // Still log to the browser console
// 		};
// 	});
// };

// export default setupWebSocketLogging;
const setupWebSocketLogging = () => {
	const originalConsole = { ...console };
	const socket = new WebSocket("wss://api.idleskiller.com:8081");

	socket.onopen = () => {
		console.log("WebSocket connected for logging.");
	};

	socket.onclose = () => {
		console.warn("WebSocket disconnected. Logs will not be sent.");
	};

	const sendLog = (level, args) => {
		const error = new Error();
		const stackLines = error.stack?.split("\n") || [];

		// Automatically detect the logging file so we can exclude it
		const loggingFileName = "logging.js"; // Adjust this if needed

		// Find the first relevant file reference that is NOT from the logging file
		let callerInfo =
			stackLines
				.map(line => line.trim())
				.filter(line => !line.includes(loggingFileName)) // Ignore logging.js
				.find(line => line.includes("/src/")) || "unknown";

		// Extract only the file path and line number
		callerInfo = callerInfo.replace(/^(.*https?:\/\/[^/]+\/)/, ""); // Remove domain
		callerInfo = callerInfo.replace(/\?.*$/, ""); // Remove query params
		callerInfo = callerInfo.replace(/^\s*at\s*/, ""); // Remove "at " from stack trace

		const logMessage = {
			level,
			message: args
				.map(arg => (typeof arg === "object" ? JSON.stringify(arg) : arg))
				.join(" "),
			timestamp: new Date().toISOString(),
			source: callerInfo.trim(),
		};

		if (socket.readyState === WebSocket.OPEN) {
			socket.send(JSON.stringify(logMessage));
		}
	};

	["log", "warn", "error", "info", "debug"].forEach(method => {
		console[method] = (...args) => {
			sendLog(method, args); // Send to WebSocket
			originalConsole[method](...args); // Log to browser console
		};
	});
};

export default setupWebSocketLogging;
