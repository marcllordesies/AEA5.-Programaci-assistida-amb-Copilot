import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { crearApp } from '../src/app.js';
import { crearBaseDades } from '../src/db.js';

let servidor;
let base;

before(() => {
  servidor = crearApp(crearBaseDades()).listen(0);
  base = `http://localhost:${servidor.address().port}`;
});

after(() => servidor.close());

test('GET /api/productes retorna tots els productes', async () => {
  const resposta = await fetch(`${base}/api/productes`);
  assert.equal(resposta.status, 200);
  const productes = await resposta.json();
  assert.equal(productes.length, 6);
});

test('GET /api/productes?categoria=roba filtra per categoria', async () => {
  const resposta = await fetch(`${base}/api/productes?categoria=roba`);
  const productes = await resposta.json();
  assert.ok(productes.every((p) => p.categoria === 'roba'));
});

test('GET /api/productes retorna la mitjana d’avaluacions arrodonida a 1 decimal', async () => {
  const resposta = await fetch(`${base}/api/productes`);
  assert.equal(resposta.status, 200);
  const productes = await resposta.json();

  const producte1 = productes.find((p) => p.id === 1);
  const producte3 = productes.find((p) => p.id === 3);
  const producte2 = productes.find((p) => p.id === 2);

  assert.equal(producte1.mitjana_puntuacio, 4);
  assert.equal(producte3.mitjana_puntuacio, 4);
  assert.equal(producte2.mitjana_puntuacio, 0);
});

test('GET /api/productes retorna la mitjana correcta per a un producte amb ressenyes i per a un sense ressenyes', async () => {
  const resposta = await fetch(`${base}/api/productes`);
  assert.equal(resposta.status, 200);
  const productes = await resposta.json();

  const producteAmbRessenyes = productes.find((p) => p.id === 1);
  const producteSenseRessenyes = productes.find((p) => p.id === 2);

  assert.ok(producteAmbRessenyes);
  assert.equal(producteAmbRessenyes.mitjana_puntuacio, 4);

  assert.ok(producteSenseRessenyes);
  assert.equal(producteSenseRessenyes.mitjana_puntuacio, 0);
});

test('GET /api/categories retorna totes les categories amb el nombre de productes', async () => {
  const resposta = await fetch(`${base}/api/categories`);
  assert.equal(resposta.status, 200);

  const categories = await resposta.json();
  assert.deepEqual(categories, [
    { categoria: 'casa', total_productes: 2 },
    { categoria: 'papereria', total_productes: 2 },
    { categoria: 'roba', total_productes: 2 },
  ]);
});

test('GET /api/categories inclou recompte numèric per a cada categoria', async () => {
  const resposta = await fetch(`${base}/api/categories`);
  assert.equal(resposta.status, 200);

  const categories = await resposta.json();
  assert.ok(categories.every((c) => typeof c.categoria === 'string'));
  assert.ok(categories.every((c) => Number.isInteger(c.total_productes) && c.total_productes > 0));
});

test('GET /api/productes/:id retorna 404 si no existeix', async () => {
  const resposta = await fetch(`${base}/api/productes/999`);
  assert.equal(resposta.status, 404);
});
