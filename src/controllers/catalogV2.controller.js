import db from "../db.js";

export const getCatalogItemsV2 = (req, res) => {
  db.all("SELECT * FROM catalog ORDER BY id ASC LIMIT 3", (err, rows) => {
    if (err) {
      res.status(500).json({ error: "Failed to retrieve catalog items" });
    } else {
      res.json(rows);
    }
  });
};