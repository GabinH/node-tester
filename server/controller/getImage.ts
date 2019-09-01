import { RequestHandler } from "express";
import fs from "fs";

import { s3Client } from "../config";

export const getImage: RequestHandler = function(req, res) {
    const { name } = req.params;
    const path = `./assets/${name}`;

    console.log(`Try to get ${name}`);

    try {
        if (fs.existsSync(path)) {
            console.log(`${name} already exist.`);

            const existingFile = fs.createReadStream(path);
            console.log(existingFile);

            res.send(existingFile);
        } else {
            const file = fs.createWriteStream(`assets/${name}`);
            file.on("close", function() {
                console.log("File created.");
            });

            const downloadParams = {
                Bucket: process.env.BUCKET_NAME as string,
                Key: "beta.png"
            };

            s3Client
                .getObject(downloadParams)
                .createReadStream()
                .on("error", function(err: Error) {
                    res.status(500).json({ error: "Error -> " + err });
                })
                .pipe(file);

            res.send("Done.");
        }
    } catch (err) {
        console.error(err);
    }
};
