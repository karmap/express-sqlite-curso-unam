import { Router } from "express";
import { createCatalogItem, getCatalogItems } from "../controllers/catalog.controller.js";

const router = Router();

// Get last 5 items in catalog
router.get('/', getCatalogItems);

router.post('/', createCatalogItem);

// TODO: Implement update and delete controllers
router.delete('/:id', (req, res) => {
  res.status(501).json({ error: "Not implemented", id: req.params.id });
});

router.put('/:id', (req, res) => {
  res.status(501).json({ error: "Not implemented", id: req.params.id });
});

export default router;