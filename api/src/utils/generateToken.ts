// function generateToken(length: number) {
// 	let result = "";
// 	const characters = "abcdefghijklmnopqrstuvwxyz0123456789.&!@";

// 	// Loop to generate characters for the specified length
// 	for (let i = 0; i < length; i++) {
// 		const randomInd = Math.floor(Math.random() * characters.length);
// 		result += characters.charAt(randomInd);
// 	}
// 	return result;
// }

// export default generateToken;
import crypto from "crypto";

/** Sync */
function randomString(length, chars) {
	if (!chars) {
		throw new Error("Argument 'chars' is undefined");
	}

	const charsLength = chars.length;
	if (charsLength > 256) {
		throw new Error(
			"Argument 'chars' should not have more than 256 characters" +
				", otherwise unpredictability will be broken"
		);
	}

	const randomBytes = crypto.randomBytes(length);
	let result = new Array(length);

	let cursor = 0;
	for (let i = 0; i < length; i++) {
		cursor += randomBytes[i];
		result[i] = chars[cursor % charsLength];
	}

	return result.join("");
}

/** Sync */
async function generateToken(length: number = 50) {
	return randomString(
		length,
		"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.$-_!"
	);
}

export default generateToken;
