/**
 * Calcula el total del carret aplicant un descompte percentual.
 * @param {Array<{preu: number, quantitat: number}>} items
 * @param {number} descompte Percentatge entre 0 i 100.
 * @returns {number} Total arrodonit a 2 decimals.
 * @throws {RangeError} Si el descompte és fora de rang.
 */
export function calcularTotal(items, descompte = 0) {
  if (descompte < 0 || descompte > 100) {
    throw new RangeError('El descompte ha de ser entre 0 i 100');
  }

  let subtotal = 0;
  for (const item of items) {
    subtotal += item.preu * item.quantitat;
  }

  const total = subtotal * (1 - descompte / 100);
  return Math.round(total * 100) / 100;
}

/**
 * Calcula el desglossament del carret i el cost d'enviament.
 * @param {Array<{preu: number, quantitat: number, pes?: number}>} items
 * @param {number} descompte Percentatge entre 0 i 100.
 * @returns {{subtotal: number, enviament: number, total: number}}
 */
export function calcularDesglossament(items, descompte = 0) {
  const subtotal = calcularTotal(items, descompte);
  const pesTotal = items.reduce(
    (pes, item) => pes + (item.pes ?? 0.5) * item.quantitat,
    0
  );

  let enviament = 9.9;
  if (subtotal > 50) {
    enviament = 0;
  } else if (pesTotal <= 1) {
    enviament = 3.9;
  } else if (pesTotal <= 5) {
    enviament = 5.9;
  }

  return {
    subtotal,
    enviament,
    total: Math.round((subtotal + enviament) * 100) / 100,
  };
}
