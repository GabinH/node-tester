import * as Express from "express";

const app: Express.Application = Express();

app.get("/", function(req, res) {
    res.send("Hello World!");
});

app.listen(3000, function() {
    console.log("Listening on port 3000.");
});
