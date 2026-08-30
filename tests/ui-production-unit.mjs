import assert from 'node:assert/strict';
import fs from 'node:fs';

const css = fs.readFileSync('src/style.css', 'utf8');
const main = fs.readFileSync('src/main.js', 'utf8');
const html = fs.readFileSync('index.html', 'utf8');

assert.match(main, /import '\.\/style\.css';/, 'primary HUD stylesheet must load');
assert.doesNotMatch(main, /premium-ui\.css|ui-production-pass\.css|narrow-hud-fix\.css/, 'legacy layered HUD overrides must stay removed');
assert.doesNotMatch(css, /backdrop-filter|\.glass\b/i, 'new HUD must not regress to glass-card styling');
assert.match(css, /--iron-1:[\s\S]*--moss:[\s\S]*--brass:[\s\S]*--ember:/, 'Lumenwood material palette tokens missing');
assert.match(css, /clip-path:/, 'forged/notched field-kit geometry missing');
assert.match(css, /button:focus-visible/, 'focus-visible treatment missing');
assert.match(css, /\.mobile-actions button[\s\S]*min-width:\s*52px[\s\S]*min-height:\s*52px/, 'mobile action target floor missing');
assert.match(css, /@media\s*\(max-width:\s*360px\)/, 'narrow-phone override missing');
assert.match(css, /safe-area-inset-(top|left|right|bottom)/, 'safe-area handling missing');
assert.match(css, /prefers-reduced-motion:\s*reduce/, 'reduced-motion handling missing');

for (const id of [
  'hp-fill', 'hp-text', 'mana-fill', 'xp-fill', 'level', 'quest-copy', 'quest-progress', 'quest-fill',
  'boss-ui', 'boss-fill', 'combo', 'toast', 'damage-layer', 'damage-flash', 'intro', 'victory',
  'enter-btn', 'restart-btn', 'mobile-controls', 'joystick', 'joystick-knob'
]) {
  assert.match(html, new RegExp(`id=["']${id}["']`), `runtime UI contract #${id} missing`);
}
for (const action of ['attack', 'spell', 'dodge']) {
  assert.match(html, new RegExp(`data-action=["']${action}["']`), `mobile action ${action} missing`);
}

let depth = 0;
for (const char of css) {
  if (char === '{') depth += 1;
  if (char === '}') depth -= 1;
  assert.ok(depth >= 0, 'CSS braces close before they open');
}
assert.equal(depth, 0, 'CSS braces are unbalanced');

console.log('UI PRODUCTION UNIT PASS');
