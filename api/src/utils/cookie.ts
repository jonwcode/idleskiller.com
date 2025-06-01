import { Response, Request } from "express";

/**
 *
 * @param {string} name
 * @param {boolean} decode
 * @returns
 */
// export function readCookie(name: string, req: Request, decode = true) {
// 	var cookie = req.cookies;
// 	// user=someone; session=mySessionID
// 	return cookie.split("; ");
// }
/**
 *
 * @param {string} name
 */
export const deleteCookie = (name: string) => {
	document.cookie = name + "=; Max-Age=-99999999;";
};

/**
 * 	Express - setCookie
 *
 * @param {string} name
 * @param {string} value
 * @param {Response} res
 * @param {number} milliseconds 7 Days Default - 3600*24*7 - 3600 is one hour
 */
export const setCookie = async (
	name: string,
	value: string | object | [] | object[],
	res: Response,
	req: Request,
	milliseconds: number | undefined = 604800
) => {
	const expire_time = Math.floor(new Date().getTime() / 1000) + milliseconds;
	res.cookie(name, value, {
		maxAge: expire_time,
		path: "/",
		domain: ".idleskiller.com",
		httpOnly: req.secure || req.headers["x-forwarded-proto"] === "https", // Only set on HTTPS
		secure: true,
	});

	console.log("new cookie being made!");
};
