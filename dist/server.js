"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Express = require("express");
const app = Express();
app.get("/", function (req, res) {
    res.send("Hello World!");
});
app.listen(3000, function () {
    console.log("Listening on port 3000.");
});
