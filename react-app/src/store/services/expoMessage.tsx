import React, { useEffect } from "react";
import useGetBrowser from "@/hooks/getBrowser";
import { type deviceType, type deviceInfo, type screen } from "@/types/store";

export default function ExpoMessage(
	setDeviceInfo: React.Dispatch<React.SetStateAction<deviceInfo>>
) {
	const { OS, osBuildId } = useGetBrowser();

	useEffect(() => {
		// Send a Message to the react native app to let it know
		// That the React App is ready

		// Send a message to Expo App
		window.ReactNativeWebView?.postMessage(JSON.stringify({ type: "ready" }));
		const handleMessage = (event: MessageEvent) => {
			// console.log(event.data);
			const data = JSON.parse(event.data);

			setDeviceInfo({
				deviceType: data.deviceType === "Unknown" ? "Web" : data.deviceType,
				osName: data.OS,
				osBuildId: data.deviceBuildId,
			});
		};

		if (window.ReactNativeWebView) {
			// Send the data to the Expo App
			// Add an event listener to listen for messages from the WebView

			window.addEventListener("message", handleMessage);
			// Android Device require you listen on the document
			document.addEventListener("message", (event: any) => handleMessage(event));
		} else {
			// If this is not a Expo App or a device
			// Set the variables for the Desktop Browser
			setDeviceInfo({
				deviceType: "Browser",
				osBuildId: osBuildId,
				osName: OS,
			});
		}

		return () => {
			// Cleanup the event listener
			window.removeEventListener("message", handleMessage);
			document.removeEventListener("message", handleMessage as any);
		};
	}, []);
}
