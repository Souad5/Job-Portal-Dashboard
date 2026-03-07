"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Express = require("express");
const app = Express();
const PORT = 3000;
app.get("/", (req, res) => {
    res.send("<h1>Welcome to the server</h1>");
});
app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map