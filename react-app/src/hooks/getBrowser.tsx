import React, { useState } from "react";

export const useGetBrowser = () => {
	let userAgent;

	if (window.navigator) {
		userAgent = window.navigator.userAgent;
	} else {
		return userAgent;
	}

	const osArray = [
		{ regex: /windows nt 10/i, name: "Windows 10" },
		{ regex: /windows nt 6.3/i, name: "Windows 8.1" },
		{ regex: /windows nt 6.2/i, name: "Windows 8" },
		{ regex: /windows nt 6.1/i, name: "Windows 7" },
		{ regex: /windows nt 6.0/i, name: "Windows Vista" },
		{ regex: /windows nt 5.2/i, name: "Windows Server 2003/XP x64" },
		{ regex: /windows nt 5.1/i, name: "Windows XP" },
		{ regex: /macintosh|mac os x/i, name: "Mac OS X" },
		{ regex: /linux/i, name: "Linux" },
		{ regex: /ubuntu/i, name: "Ubuntu" },
		{ regex: /iphone/i, name: "iPhone" },
		{ regex: /android/i, name: "Android" },
		{ regex: /blackberry/i, name: "BlackBerry" },
		{ regex: /webos/i, name: "Mobile" },
	];

	const browserArray = [
		{ regex: /msie/i, name: "Internet Explorer" },
		{ regex: /firefox/i, name: "Firefox" },
		{ regex: /safari/i, name: "Safari" },
		{ regex: /chrome/i, name: "Chrome" },
		{ regex: /edge/i, name: "Edge" },
		{ regex: /opera/i, name: "Opera" },
		{ regex: /netscape/i, name: "Netscape" },
		{ regex: /maxthon/i, name: "Maxthon" },
		{ regex: /konqueror/i, name: "Konqueror" },
		{ regex: /mobile/i, name: "Handheld Browser" },
	];

	const matchOS = osArray.find(os => os.regex.test(userAgent))?.name || "Unknown OS";
	const matchBrowser =
		browserArray.find(browser => browser.regex.test(userAgent))?.name || "Unknown Browser";

	return {
		userAgent: `${matchBrowser}/${matchOS}`,
		OS: matchOS,
		osBuildId: window.navigator.platform,
	};
};
export default useGetBrowser;
