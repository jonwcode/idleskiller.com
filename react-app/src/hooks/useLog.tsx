// useWSLog.tsx
import { useEffect, useRef } from "react";

const useLog = () => {
	// Create a ref to hold the WebSocket instance, so we can access it in the returned function
	const wsRef = useRef<WebSocket | null>(null);

	useEffect(() => {
		// Initialize WebSocket when the hook is first called
		wsRef.current = new WebSocket("wss://api.idleskiller.com:8081"); // Replace with your WebSocket URL

		wsRef.current.onopen = () => {
			console.log("WebSocket connection established.");
		};

		wsRef.current.onclose = () => {
			console.log("WebSocket connection closed.");
		};

		// wsRef.current.onerror = error => {
		// 	console.error("WebSocket error:", error);
		// };

		return () => {
			if (wsRef.current) {
				wsRef.current.close(); // Clean up WebSocket connection when the component unmounts
			}
		};
	}, []);

	// Function to log a message to the WebSocket server
	const logToWS = (message: any) => {
		if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
			wsRef.current.send(message); // Send message to WebSocket server
			console.log("Logged to WebSocket:", message);
		} else {
			console.error("WebSocket is not open. Could not send message:", message);
		}
	};

	return logToWS; // Return the log function
};

export default useLog;
