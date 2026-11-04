import { Router } from 'express';
import { calcularDesglossament } from '../utils/carret.js';

/**
 * Crea les rutes relacionades amb el carret de compra.
 *
 * POST /total rep { items: [{ preu, quantitat, pes? }], descompte } i retorna
 * { subtotal, enviament, total }. Les dades invàlides es responen amb 400.
 *
 * @returns {import('express').Router} Router d'Express per a les rutes del carret.
 */
export function routerCarret() {
  const router = Router();

  router.post('/total', (req, res) => {
    const { items = [], descompte = 0 } = req.body;
    try {
      res.json(calcularDesglossament(items, descompte));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  return router;
}
