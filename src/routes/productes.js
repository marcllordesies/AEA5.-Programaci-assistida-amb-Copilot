import { Router } from 'express';

export function routerProductes(db) {
  const router = Router();

  // GET /api/productes?categoria=roba
  router.get('/', (req, res) => {
    const { categoria } = req.query;

    let sql = `
      SELECT
        p.id,
        p.nom,
        p.descripcio,
        p.categoria,
        p.preu,
        COALESCE(ROUND(AVG(r.puntuacio), 1), 0) AS mitjana_puntuacio
      FROM productes p
      LEFT JOIN ressenyes r ON r.producte_id = p.id
    `;

    const params = [];
    if (categoria) {
      sql += ' WHERE p.categoria = ?';
      params.push(String(categoria));
    }

    sql += ' GROUP BY p.id, p.nom, p.descripcio, p.categoria, p.preu ORDER BY p.id';

    const productes = db.prepare(sql).all(...params);
    res.json(productes);
  });

  // GET /api/productes/:id
  router.get('/:id', (req, res) => {
    const producte = db
      .prepare('SELECT * FROM productes WHERE id = ?')
      .get(Number(req.params.id));
    if (!producte) {
      return res.status(404).json({ error: 'Producte no trobat' });
    }
    res.json(producte);
  });

  return router;
}
