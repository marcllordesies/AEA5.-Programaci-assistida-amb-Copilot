import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcularDesglossament, calcularTotal } from '../src/utils/carret.js';

test('calcula el total sense descompte', () => {
  const items = [
    { preu: 10, quantitat: 2 },
    { preu: 5.5, quantitat: 1 },
  ];
  assert.equal(calcularTotal(items), 25.5);
});

test('aplica un descompte percentual', () => {
  const items = [{ preu: 20, quantitat: 2 }];
  assert.equal(calcularTotal(items, 25), 30);
});

test('un carret buit val 0', () => {
  assert.equal(calcularTotal([]), 0);
});

test('llança un error si el descompte és fora de rang', () => {
  assert.throws(() => calcularTotal([], 120), RangeError);
});

test('calcula l enviament per pes amb mig quilo per defecte', () => {
  const resultat = calcularDesglossament([{ preu: 10, quantitat: 2 }]);
  assert.deepEqual(resultat, { subtotal: 20, enviament: 3.9, total: 23.9 });
});

test('aplica l enviament gratuït després del descompte', () => {
  const resultat = calcularDesglossament(
    [{ preu: 60, quantitat: 1, pes: 6 }],
    10
  );
  assert.deepEqual(resultat, { subtotal: 54, enviament: 0, total: 54 });
});
