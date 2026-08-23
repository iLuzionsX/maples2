import assert from 'node:assert/strict';
import fs from 'node:fs';

const css = fs.readFileSync('src/ui-production-pass.css', 'utf8');
const main = fs.readFileSync('src/main.js', 'utf8');

assert.ok(main.indexOf("import './ui-production-pass.css';") > main.indexOf("import './premium-ui.css';"), 'production pass must load after premium UI');
assert.doesNotMatch(css, /@import\b/i, 'production pass must not import remote/local styles');
assert.doesNotMatch(css, /url\s*\(/i, 'production pass must not add asset/network dependencies');
assert.match(css, /min-width:\s*761px[\s\S]*max-width:\s*1180px[\s\S]*\.boss-ui[\s\S]*top:\s*118px/, 'medium desktop boss separation rule missing');
assert.match(css, /button:focus-visible/, 'focus-visible treatment missing');
assert.match(css, /\.skill-icon::after[\s\S]*animation:\s*none\s*!important/, 'decorative skill animation must be suppressed');
assert.match(css, /\.mobile-actions button[\s\S]*min-width:\s*52px[\s\S]*min-height:\s*52px/, 'mobile action target floor missing');
assert.match(css, /@media\s*\(max-width:\s*360px\)/, 'narrow-phone override missing');
assert.match(css, /safe-area-inset-(top|left|right|bottom)/, 'safe-area handling missing');

let depth = 0;
for (const char of css) {
  if (char === '{') depth += 1;
  if (char === '}') depth -= 1;
  assert.ok(depth >= 0, 'CSS braces close before they open');
}
assert.equal(depth, 0, 'CSS braces are unbalanced');

console.log('UI PRODUCTION UNIT PASS');
