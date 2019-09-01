import Express from "express";

import https from "https";

import { httpsOptions } from "./config";
import { router } from "./router";

const app = Express();

const localhost = "localhost";
const port = 3001;

app.use("/", router);

https.createServer(httpsOptions, app).listen(port, function() {
    console.log(`Server running at https://${localhost}:${port}/`);
});
