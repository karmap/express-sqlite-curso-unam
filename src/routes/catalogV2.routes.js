import { Router } from "express";
import { getCatalogItemsV2 } from "../controllers/catalogV2.controller.js";

const router = Router();

router.get('/', getCatalogItemsV2);

export default router;