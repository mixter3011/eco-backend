import express from "express";
import askControllers from "../controllers/askControllers.js";
const router = express.Router();

router.post("/send", askControllers.send);

export default router