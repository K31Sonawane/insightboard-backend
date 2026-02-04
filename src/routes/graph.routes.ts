import { Router } from "express";
import { createGraph } from "../controllers/graph.controller";

const router = Router();

router.post("/", createGraph);

export default router;
