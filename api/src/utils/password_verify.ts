import bcrypt from "bcrypt";

async function passwordVerify(plainPassword: string, hashedPassword: string): Promise<boolean> {
	return new Promise(async (resolve, reject) => {
		const match = await bcrypt.compare(plainPassword, hashedPassword);
		if (match) {
			resolve(true);
		} else {
			resolve(false);
		}
	});
}

export default passwordVerify;
