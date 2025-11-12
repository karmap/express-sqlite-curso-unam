import { Router } from "express";
import { createCatalogItem, deleteCatalogItem, getCatalogItems, updateCatalogItem } from "../controllers/catalog.controller.js";

const router = Router();

// Get last 5 items in catalog
router.get('/', getCatalogItems);

router.post('/', createCatalogItem);

router.delete('/:id', deleteCatalogItem);

router.put('/:id', updateCatalogItem);

export default router;