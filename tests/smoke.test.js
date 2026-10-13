import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const app = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8');
const css = readFileSync(new URL('../src/App.css', import.meta.url), 'utf8');
const globalCss = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8');

test('product name and demo disclosure are present', () => {
  assert.match(app, /CX Agent Assist/);
  assert.match(app, /Rules-based assistance, not live AI/);
  assert.match(app, /Editable draft · Not sent/);
});
test('ticket workflow controls are present', () => {
  for (const label of ['Analyze conversation', 'Copy reply', 'Escalate', 'Mark resolved', 'Save note', 'Reset demo data']) {
    assert.ok(app.includes(label), label);
  }
});
test('assistant portrait assets exist', () => {
  assert.ok(existsSync(new URL('../public/Gal.jpeg', import.meta.url)));
  assert.ok(existsSync(new URL('../public/Daniel.jpeg', import.meta.url)));
});
test('responsive rules and mobile navigation exist', () => {
  assert.match(css, /@media\s*\(max-width:\s*590px\)/);
  assert.match(app, /mobileMenuOpen/);
});
test('global CSS does not constrain app to Vite starter width', () => {
  assert.doesNotMatch(globalCss, /width:\s*1126px/);
  assert.match(globalCss, /#root\s*\{[^}]*width:\s*100%/);
});
test('reset clears demo interaction state', () => {
  for (const expression of ["setDraft('')", "setNote('')", "setSearch('')", "setFilter('All')", "setKbSearch('')"]) {
    assert.ok(app.includes(expression), expression);
  }
});
