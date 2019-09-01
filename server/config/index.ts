import AWS from "aws-sdk";

import fs from "fs";
import path from "path";

export const s3Client = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_PRIVATE_KEY
});

export const httpsOptions = {
    cert: fs.readFileSync(path.join(__dirname, "../../secret", "server.crt")),
    key: fs.readFileSync(path.join(__dirname, "../../secret", "server.key")),
    passphrase: "test"
};
