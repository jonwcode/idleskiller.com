import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import Provider from "@store/provider";
import setupWebSocketLogging from "@/logging";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@/index.css";

// setupWebSocketLogging();
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider>
			<Router>
				<Routes>
					<Route path="/*" element={<App />} />
				</Routes>
			</Router>
		</Provider>
	</StrictMode>
);
