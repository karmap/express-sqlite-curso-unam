import db from "../db.js";

export const getCatalogItems = (req, res) => {
  db.all("SELECT * FROM catalog ORDER BY id DESC LIMIT 10", (err, rows) => {
    if (err) {
      res.status(500).json({ error: "Failed to retrieve catalog items" });
    } else {
      res.json(rows);
    }
  });
};

export const createCatalogItem = (req, res) => {
  const { name, description } = req.body;
  db.run("INSERT INTO catalog (name, description) VALUES (?, ?)", [name, description], function (err) {
    if (err) {
      res.status(500).json({ error: "Failed to create catalog item" });
    } else {
      res.status(201).json({ id: this.lastID, name, description });
    }
  });
};

export const deleteCatalogItem = (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM catalog WHERE id = ?", [id], function (err) {
    if (err) {
      res.status(500).json({ error: "Failed to delete catalog item" });
    } else if (this.changes === 0) {
      res.status(404).json({ error: "Catalog item not found" });
    } else {
      res.status(200).json({ message: "Catalog item deleted successfully" });
    }
  });
};

export const updateCatalogItem = (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  db.run("UPDATE catalog SET name = ?, description = ? WHERE id = ?", [name, description, id], function (err) {
    if (err) {
      res.status(500).json({ error: "Failed to update catalog item" });
    } else if (this.changes === 0) {
      res.status(404).json({ error: "Catalog item not found" });
    } else {
      res.status(200).json({ id, name, description });
    }
  });
};
