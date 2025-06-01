import { randomBytes } from "crypto";
export default function generateToken(length = 32) {
    return randomBytes(length).toString("base64"); // Generates a token of `length * 2` characters
}
//# sourceMappingURL=generateToken.js.map