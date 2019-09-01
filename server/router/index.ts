import Express from "express";

import { getImage } from "../controller";

const router = Express.Router();

router.get("/file", getImage);

export { router };
