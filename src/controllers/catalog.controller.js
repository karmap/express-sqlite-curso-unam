import db from "../db.js";

export const getCatalogItems = (req, res) => {
  db.all("SELECT * FROM catalog ORDER BY id DESC LIMIT 5", (err, rows) => {
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
