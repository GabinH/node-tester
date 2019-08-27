"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const path_1 = __importDefault(require("path"));
const app = express_1.default();
const HOSTNAME = "localhost";
const PORT = 3005;
const httpsOptions = {
    cert: fs_1.default.readFileSync(path_1.default.join(__dirname, "ssl", "server.crt")),
    key: fs_1.default.readFileSync(path_1.default.join(__dirname, "ssl", "server.key"))
};
app.get("/", function (req, res) {
    res.send("Hello World!");
});
https_1.default.createServer(httpsOptions, app).listen(PORT, function () {
    console.log(`Server running at https://${HOSTNAME}:${PORT}/`);
});
