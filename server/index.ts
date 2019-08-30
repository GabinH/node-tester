import Express from "express";
import fs from "fs";
import https from "https";
import path from "path";
import AWS from "aws-sdk";

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_PRIVATE_KEY
});
const s3 = new AWS.S3();

const app = Express();

const HOSTNAME = "localhost";
const PORT = 3001;

const httpsOptions = {
    cert: fs.readFileSync(
        path.join(__dirname, "../server/secret", "server.crt")
    ),
    key: fs.readFileSync(
        path.join(__dirname, "../server/secret", "server.key")
    ),
    passphrase: "test"
};

app.get("/", function(req, res) {
    console.log("calling server");
    s3.getObject({ Bucket: "react-native-testeur", Key: "beta.png" }, function(
        error,
        data
    ) {
        if (error != null) {
            alert("Failed to retrieve an object: " + error);
        } else {
            console.log(data);
            res.send(data);
        }
    });
});

https.createServer(httpsOptions, app).listen(PORT, function() {
    console.log(`Server running at https://${HOSTNAME}:${PORT}/`);
});

// app.listen(PORT, function() {
//     console.log(`Server running at https://${HOSTNAME}:${PORT}/`);
// });
