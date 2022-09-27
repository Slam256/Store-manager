import { Router } from "express";
import routes from "./v1/indexV1.js";

const router = Router();

router.use("/api/v1", routes);

export default router;
