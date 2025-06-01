/**
 *
 * @param {string} name
 * @param {boolean} decode
 * @returns
 */
export function useReadCookie(name: string, decode = true) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(";");
	let contents;
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == " ") c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) contents = c.substring(nameEQ.length, c.length);

		if (decode && contents) {
			return decodeURI(contents);
		}
		if (!decode && contents) {
			return contents;
		}
	}

	return null;
}
/**
 *
 * @param {string} name
 */
export const deleteCookie = (name: string) => {
	document.cookie = name + "=; Max-Age=-99999999;";
};

/**
 *
 * @param {string} name
 * @param {string} value
 * @param {number} days
 */
export const useSetCookie = (
	name: string,
	value: string | object | [] | object[],
	days: number | undefined
) => {
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + value + expires + "; path=/;";
};
