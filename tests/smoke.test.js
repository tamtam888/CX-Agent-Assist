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

const polish = readFileSync(new URL('../src/polish.css', import.meta.url), 'utf8');
test('final polish stylesheet is imported and readable typography is configured', () => {
  assert.match(app, /import '\.\/polish\.css'/);
  assert.match(polish, /\.cx-reset-visible/);
  assert.match(polish, /\.cx-filters/);
  assert.match(polish, /\.cx-message>div p\{font-size:16px/);
});
test('reset returns persona, navigation and ticket data to defaults', () => {
  assert.match(app, /setTickets\(initial\);setPersona\('nova'\)/);
  assert.match(app, /setNavCollapsed\(true\);setToast\('Demo reset'\)/);
});
test('filter and search choose matching tickets and clear stale analysis', () => {
  assert.match(app, /const first=tickets\.find\(t=>f==='All'\|\|t\.status===f\)/);
  assert.match(app, /if\(first\)setActiveId\(first\.id\)/);
  assert.match(app, /setAnalyzed\(false\);setDraft\(''\);setNote\(''\)/);
});
test('collapsed navigation and visible reset are discoverable', () => {
  assert.match(app, /title=\{name\} aria-label=\{name\}/);
  assert.match(app, /className="cx-reset-visible"/);
  assert.match(app, /aria-expanded=\{mobileMenuOpen\|\|!navCollapsed\}/);
});

test('page navigation remains visible independently of the sidebar', () => {
  assert.match(app, /className="cx-top-nav"/);
  assert.match(app, /'Overview','Inbox','Knowledge base'\]\.map/);
  assert.match(app, /onClick=\{\(\)=>\{setPage\(name\);setMobileMenuOpen\(false\)\}\}/);
  assert.match(polish, /\.cx-top-page\.active/);
});
test('expanded sidebar shows text labels explicitly', () => {
  assert.match(app, /className="cx-nav-text"/);
  assert.match(polish, /flex-basis:236px!important/);
  assert.match(polish, /\.cx-sidebar \.cx-nav-text\{display:inline!important/);
});

test('collapsed sidebar hides text and expanded sidebar reserves full width', () => {
  assert.match(polish, /\.cx-shell\.nav-collapsed \.cx-sidebar\{width:76px!important/);
  assert.match(polish, /\.cx-shell:not\(\.nav-collapsed\) \.cx-sidebar\{width:236px!important/);
  assert.match(polish, /\.cx-shell\.nav-collapsed \.cx-sidebar \.cx-nav-text\{display:none!important/);
  assert.doesNotMatch(app, /width:navCollapsed\?76:226/);
});

test('design polish keeps a single desktop navigation hierarchy and mobile fallback', () => {
  assert.match(app, /className="cx-current-page"/);
  assert.match(polish, /@media\(min-width:591px\)\{\s*\.cx-top-nav\{display:none!important/);
  assert.match(polish, /@media\(max-width:590px\)\{\s*\.cx-current-page\{display:none!important/);
  assert.match(polish, /\.cx-top-nav\{display:flex!important/);
});
test('conversation insight hierarchy and editable reply remain intact', () => {
  assert.match(app, /Conversation insights/);
  assert.match(app, /className="cx-reply"/);
  assert.match(app, /onChange=\{e=>setDraft\(e.target.value\)\}/);
  assert.match(polish, /\.cx-analysis-grid>div\{background:#f8fafc!important/);
});
