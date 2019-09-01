import { RequestHandler } from "express";
import fs from "fs";

import { s3Client } from "../config";

export const getImage: RequestHandler = function(req, res) {
    const file = fs.createWriteStream("toto.png");
    file.on("close", function() {
        console.log("file created.");
    });

    console.log(process.env.BUCKET_NAME);

    const downloadParams = {
        Bucket: process.env.BUCKET_NAME as string,
        Key: ""
    };

    s3Client
        .getObject(downloadParams)
        .createReadStream()
        .on("error", function(err: Error) {
            res.status(500).json({ error: "Error -> " + err });
        })
        .pipe(file)
        .pipe(res.send("Done."));
};
