import MobileDetect from "mobile-detect";

function DeviceInfo(userAgent) {
	let osName = "Unknown";
	let osBuildId = "Unknown";
	let deviceType = "Browser";

	// Detect OS and Version
	if (/Android/.test(userAgent)) {
		osName = "Android";
		const buildMatch = userAgent.match(/Build\/([\w\d\.\-]+)/);
		if (buildMatch) osBuildId = buildMatch[1];
	} else if (/iPhone|iPad|iPod/.test(userAgent)) {
		osName = "iOS"; // Properly recognize iOS instead of Mac
		const iosMatch = userAgent.match(/OS (\d+[_\d]*) like Mac OS X/);
		if (iosMatch) osBuildId = iosMatch[1].replace(/_/g, ".");
	} else if (/Mac OS X/.test(userAgent)) {
		osName = "Mac";
		const macMatch = userAgent.match(/Mac OS X ([\d_]+)/);
		if (macMatch) osBuildId = macMatch[1].replace(/_/g, ".");
	} else if (/Windows NT/.test(userAgent)) {
		osName = "Windows";
		const windowsMatch = userAgent.match(/Windows NT ([\d\.]+)/);
		if (windowsMatch) osBuildId = `Windows ${windowsMatch[1]}`;
	} else if (/Linux/.test(userAgent)) {
		osName = "Linux";
	}

	// Determine Device Type
	if (/iPhone|Android.*Mobile/.test(userAgent)) {
		deviceType = "Phone";
	} else if (
		/iPad|Tablet|Nexus 7|Nexus 10/.test(userAgent) ||
		(/Android/.test(userAgent) && !/Mobile/.test(userAgent))
	) {
		deviceType = "Tablet";
	}

	return { osName, osBuildId, deviceType };
}

export default DeviceInfo;

// Example User-Agents

// Run the function
// userAgents.forEach(ua => {
// 	console.log(extractDeviceInfo(ua));
// });
