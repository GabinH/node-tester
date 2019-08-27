import Express from "express";
import fs from "fs";
import https from "https";
import path from "path";

const app: Express.Application = Express();

const HOSTNAME = "localhost";
const PORT = 3005;

const httpsOptions = {
    cert: fs.readFileSync(path.join(__dirname, "ssl", "server.crt")),
    key: fs.readFileSync(path.join(__dirname, "ssl", "server.key"))
};

app.get("/", function(req, res) {
    res.send("Hello World!");
});

https.createServer(httpsOptions, app).listen(PORT, function() {
    console.log(`Server running at https://${HOSTNAME}:${PORT}/`);
});
