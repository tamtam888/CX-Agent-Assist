import { EXAMPLE_MESSAGES } from '../utils/mockAnalysis';
import './MessageInput.css';

function MessageInput({ message, onChange, onAnalyze, onClear, isLoading }) {
  const canSubmit = message.trim().length > 0 && !isLoading;
  const canClear = message.trim().length > 0;

  return (
    <section className="message-input">
      <div className="message-input__examples">
        <span className="message-input__examples-label">Try an example:</span>
        {EXAMPLE_MESSAGES.map((example) => (
          <button
            key={example.label}
            type="button"
            className="message-input__example-btn"
            onClick={() => onChange(example.text)}
          >
            {example.label}
          </button>
        ))}
      </div>

      <textarea
        className="message-input__textarea"
        placeholder="Paste a customer message here..."
        value={message}
        onChange={(e) => onChange(e.target.value)}
        rows={6}
      />

      <div className="message-input__actions">
        {canClear && (
          <button
            type="button"
            className="message-input__clear"
            onClick={onClear}
          >
            Clear
          </button>
        )}
        <button
          type="button"
          className="message-input__submit"
          onClick={onAnalyze}
          disabled={!canSubmit}
        >
          {isLoading ? 'Analyzing...' : 'Analyze Message'}
        </button>
      </div>
    </section>
  );
}

export default MessageInput;
