"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const db_1 = require("./config/db");
const PORT = process.env.PORT || 5000;
(0, db_1.connectDB)();
app_1.default.use("/", (req, res) => {
    const htmlRes = `<!DOCTYPE html>
    <html>
    <head>
        <title style="text-align: center"></title>
    </head>
    <body>
        <h1 style="font-size: 24px; text-align: center">404 Not Found<br> You hit the wrong url!</h1>
        <p style="padding: 10px;text-align: center">Please give a valid url.</p>
    </body>
    </html>`;
    res.status(404).send(htmlRes);
});
app_1.default.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map