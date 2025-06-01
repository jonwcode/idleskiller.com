const bcrypt = require("bcrypt");
const password_hash = async (plainPassword) => {
    // Generate a salt
    const salt = await bcrypt.genSalt(12); // Higher salt rounds are more secure but slower.
    // Hash the password
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    return hashedPassword;
};
export default password_hash;
//# sourceMappingURL=pass_hash.js.map