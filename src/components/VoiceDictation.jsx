import { useEffect, useRef, useState } from 'react';
import './VoiceDictation.css';

const getRecognition = () => {
  if (typeof window === 'undefined') return null;
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
};

function appendTranscript(base, spoken, maxLength = 2000) {
  const prefix = base.trimEnd();
  const suffix = spoken.trim();
  if (!suffix) return prefix.slice(0, maxLength);
  return (prefix ? prefix + ' ' + suffix : suffix).slice(0, maxLength);
}

const errors = {
  'not-allowed': 'Microphone permission was denied. Enable it in your browser settings or type your message.',
  'service-not-allowed': 'Speech recognition is unavailable in this browser. You can type your message.',
  'audio-capture': 'No microphone was found. Connect a microphone or type your message.',
  'network': 'Speech recognition encountered a network error. You can type your message.',
  'no-speech': 'No speech was detected. Try again or type your message.',
  'language-not-supported': 'English speech recognition is unavailable in this browser.',
};

export default function VoiceDictation({ value, onTranscript, maxLength = 2000 }) {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [interim, setInterim] = useState('');
  const recognitionRef = useRef(null);
  const sessionRef = useRef(null);
  const onTranscriptRef = useRef(onTranscript);
  const valueRef = useRef(value);
  const constructorAvailable = Boolean(getRecognition());

  useEffect(() => { onTranscriptRef.current = onTranscript; }, [onTranscript]);
  useEffect(() => { valueRef.current = value; }, [value]);

  useEffect(() => () => {
    const recognition = recognitionRef.current;
    recognitionRef.current = null;
    sessionRef.current = null;
    if (recognition) {
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;
      recognition.abort();
    }
  }, []);

  const stop = () => {
    if (!recognitionRef.current) return;
    setStatus('processing');
    recognitionRef.current.stop();
  };

  const start = () => {
    const Constructor = getRecognition();
    if (!Constructor) return;
    setError('');
    setInterim('');
    const session = { base: valueRef.current, finalized: '' };
    sessionRef.current = session;
    let recognition;
    try {
      recognition = new Constructor();
      recognition.lang = 'en-US';
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.onresult = event => {
        if (sessionRef.current !== session) return;
        let finalized = '';
        let pending = '';
        for (let i = 0; i < event.results.length; i++) {
          const transcript = event.results[i][0]?.transcript || '';
          if (event.results[i].isFinal) finalized += ' ' + transcript;
          else pending += ' ' + transcript;
        }
        session.finalized = finalized.trim();
        const next = appendTranscript(session.base, session.finalized, maxLength);
        onTranscriptRef.current(next);
        setInterim(pending.trim());
        if (next.length >= maxLength) recognition.stop();
      };
      recognition.onerror = event => {
        if (sessionRef.current !== session) return;
        setError(errors[event.error] || 'Speech recognition failed. You can type your message.');
        setStatus('error');
        setInterim('');
      };
      recognition.onend = () => {
        if (sessionRef.current !== session) return;
        sessionRef.current = null;
        recognitionRef.current = null;
        setInterim('');
        setStatus(current => current === 'error' ? current : 'idle');
      };
      recognitionRef.current = recognition;
      setStatus('listening');
      recognition.start();
    } catch {
      recognitionRef.current = null;
      sessionRef.current = null;
      setStatus('error');
      setError('Unable to start speech recognition. Check microphone permissions or type your message.');
    }
  };

  return <div className="cx-dictation">
    <button type="button" className={'cx-dictation-button' + (status === 'listening' ? ' is-listening' : '')}
      onClick={status === 'listening' ? stop : start}
      disabled={!constructorAvailable || status === 'processing' || value.length >= maxLength}
      aria-label={status === 'listening' ? 'Stop dictation' : 'Start voice dictation'}
      aria-pressed={status === 'listening'}
      title={!constructorAvailable ? 'Speech recognition is not supported in this browser' : undefined}>
      <span aria-hidden="true">🎙</span> {status === 'listening' ? 'Stop dictation' : status === 'processing' ? 'Finishing…' : 'Dictate issue'}
    </button>
    <span className="cx-dictation-hint">English · Demo only</span>
    <span className="cx-dictation-status" role="status" aria-live="polite">
      {!constructorAvailable ? 'Voice dictation is not supported in this browser. Please type your message.' :
        error || (status === 'listening' ? (interim ? 'Hearing: ' + interim : 'Listening… Speak now.') :
          status === 'processing' ? 'Finishing transcription…' : '')}
    </span>
  </div>;
}
