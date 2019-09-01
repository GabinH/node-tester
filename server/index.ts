import express from "express";

import https from "https";

import { httpsOptions } from "./config";
import { router } from "./router";

require("dotenv").config();

const app = express();

app.use("/", router);

app.use(express.static("assets"));

https.createServer(httpsOptions, app).listen(process.env.PORT, function() {
    console.log(
        `Server running at https://${process.env.HOST}:${process.env.PORT}/`
    );
});
