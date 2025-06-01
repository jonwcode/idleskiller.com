import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
async function startServer() {
    const app = express();
    dotenv.config({
        path: ".env",
    });
    app.use(bodyParser.json({ limit: "20mb" }));
    app.listen(process.env.PORT, () => {
        console.log(`Server is now running on port ${process.env.PORT}`);
    });
}
startServer();
//# sourceMappingURL=index.js.map