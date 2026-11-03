import test from 'node:test';
import assert from 'node:assert/strict';
import { controlarMenuResponsivitat } from '../public/prueba.js';

test('controla el menú segons el breakpoint de 480px', () => {
  const logs = [];
  const logOriginal = console.log;

  console.log = (missatge) => logs.push(missatge);

  try {
    controlarMenuResponsivitat(479);
    assert.equal(logs.at(-1), 'El menú està ocult (mòbil)');

    controlarMenuResponsivitat(480);
    assert.equal(logs.at(-1), 'El menú de pantalla gran està actiu');

    controlarMenuResponsivitat(1200);
    assert.equal(logs.at(-1), 'El menú de pantalla gran està actiu');
  } finally {
    console.log = logOriginal;
  }
});
