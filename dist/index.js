"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const path_1 = __importDefault(require("path"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
aws_sdk_1.default.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_PRIVATE_KEY
});
const s3 = new aws_sdk_1.default.S3();
const app = express_1.default();
const HOSTNAME = "localhost";
const PORT = 3001;
const httpsOptions = {
    cert: fs_1.default.readFileSync(path_1.default.join(__dirname, "../server/secret", "server.crt")),
    key: fs_1.default.readFileSync(path_1.default.join(__dirname, "../server/secret", "server.key")),
    passphrase: "test"
};
app.get("/", function (req, res) {
    console.log("calling server");
    s3.getObject({ Bucket: "react-native-testeur", Key: "beta.png" }, function (error, data) {
        if (error != null) {
            alert("Failed to retrieve an object: " + error);
        }
        else {
            console.log(data);
            res.send(data);
        }
    });
});
https_1.default.createServer(httpsOptions, app).listen(PORT, function () {
    console.log(`Server running at https://${HOSTNAME}:${PORT}/`);
});
// app.listen(3000, function() {
//     console.log("Example app listening on port 3000!");
// });
