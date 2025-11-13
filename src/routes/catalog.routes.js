import { Router } from "express";
import { createCatalogItem, deleteCatalogItem, getCatalogItems, updateCatalogItem } from "../controllers/catalog.controller.js";
import { getExternalCatalogItems, getExternalItemDetail } from "../controllers/external.controller.js";

const router = Router();

// Get last 5 items in catalog
router.get('/', getCatalogItems);

router.get('/external', getExternalCatalogItems);

router.get('/external/detail/:id', getExternalItemDetail);

router.post('/', createCatalogItem);

router.delete('/:id', deleteCatalogItem);

router.put('/:id', updateCatalogItem);

export default router;