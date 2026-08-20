import assert from 'node:assert/strict';
import fs from 'node:fs';

const source = fs.readFileSync(new URL('../src/game/AssetVisuals.js', import.meta.url), 'utf8');
const settings = source.match(/function monsterSettings\([\s\S]*?\n}\n\nasync function attachEnemy/);
assert.ok(settings, 'monsterSettings() should exist');

const rotations = [...settings[0].matchAll(/rotation:\s*([^,}\n]+)/g)].map(match => match[1].trim());
assert.equal(rotations.length, 4, 'boss, ghost, bat, and default monster settings should each define a yaw');
assert.deepEqual(rotations, ['0', '0', '0', '0'], 'all imported Quaternius monsters must preserve their authored +Z forward axis');
assert.ok(!settings[0].includes('Math.PI'), 'monsterSettings must not apply a 180-degree model flip');

console.log('enemy-facing-unit: PASS');
