import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const component = readFileSync(new URL('../src/components/VoiceDictation.jsx', import.meta.url), 'utf8');
const app = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8');
const styles = readFileSync(new URL('../src/components/VoiceDictation.css', import.meta.url), 'utf8');

test('voice dictation is integrated into Test a case', () => {
  assert.match(app, /<VoiceDictation key=\{dictationResetKey\}/);
  assert.match(app, /onTranscript=\{value=>\{setCaseMessage\(value\)/);
  assert.match(app, /setDictationResetKey\(key=>key\+1\)/);
});

test('recognition supports standard and webkit implementations with English locale', () => {
  assert.match(component, /window\.SpeechRecognition \|\| window\.webkitSpeechRecognition/);
  assert.match(component, /recognition\.lang = 'en-US'/);
  assert.match(component, /recognition\.interimResults = true/);
});

test('audio is not recorded or persisted by dictation component', () => {
  assert.doesNotMatch(component, /MediaRecorder|localStorage|sessionStorage|fetch\(|XMLHttpRequest|Blob\(/);
  assert.match(component, /recognition\.abort\(\)/);
  assert.match(component, /recognition\.stop\(\)/);
});

test('speech text is bounded and does not overwrite existing text', () => {
  assert.match(component, /prefix \? prefix \+ ' ' \+ suffix : suffix/);
  assert.match(component, /\.slice\(0, maxLength\)/);
  assert.match(component, /session\.base/);
});

test('microphone permission and unsupported browsers have fallbacks', () => {
  assert.match(component, /'not-allowed'/);
  assert.match(component, /!constructorAvailable/);
  assert.match(component, /Please type your message/);
  assert.match(component, /aria-pressed/);
  assert.match(styles, /focus-visible/);
});
