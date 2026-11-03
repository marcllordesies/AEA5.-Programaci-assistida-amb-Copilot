import { Router } from 'express';

export function routerCategories(db) {
  const router = Router();

  router.get('/', (req, res) => {
    const sql = `
      SELECT categoria, COUNT(*) AS total_productes
      FROM productes
      GROUP BY categoria
      ORDER BY categoria
    `;

    const categories = db.prepare(sql).all();
    res.json(categories);
  });

  return router;
}
