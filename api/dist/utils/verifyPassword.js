const bcrypt = require("bcrypt");
async function passwordVerify(plainPassword, hashedPassword) {
    return new Promise(async (resolve, reject) => {
        const match = await bcrypt.compare(plainPassword, hashedPassword);
        if (match) {
            resolve(true);
        }
        else {
            resolve(false);
        }
    });
}
export default passwordVerify;
//# sourceMappingURL=verifyPassword.js.map