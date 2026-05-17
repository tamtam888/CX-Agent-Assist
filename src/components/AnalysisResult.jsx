import { useState } from 'react';
import './AnalysisResult.css';

const SENTIMENT_CLASS = {
  Positive: 'badge--positive',
  Neutral: 'badge--neutral',
  Negative: 'badge--negative',
  Frustrated: 'badge--frustrated',
};

const PRIORITY_CLASS = {
  Low: 'badge--low',
  Medium: 'badge--medium',
  High: 'badge--high',
  Urgent: 'badge--urgent',
};

function ResultCard({ label, value, wide }) {
  return (
    <div className={`result-card${wide ? ' result-card--wide' : ''}`}>
      <span className="result-card__label">{label}</span>
      <p className="result-card__value">{value}</p>
    </div>
  );
}

function BadgeCard({ label, value, badgeClass }) {
  return (
    <div className="result-card">
      <span className="result-card__label">{label}</span>
      <span className={`result-card__badge ${badgeClass}`}>{value}</span>
    </div>
  );
}

function AnalysisResult({ result }) {
  const [copied, setCopied] = useState(false);
  const [escalated, setEscalated] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(result.suggestedReply);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleEscalate() {
    setEscalated(true);
  }

  return (
    <section className="analysis-result">
      <h2 className="analysis-result__heading">Analysis</h2>
      <div className="result-grid">
        <ResultCard label="Summary" value={result.summary} />
        <ResultCard label="Intent" value={result.intent} />
        <BadgeCard
          label="Sentiment"
          value={result.sentiment}
          badgeClass={SENTIMENT_CLASS[result.sentiment] || ''}
        />
        <BadgeCard
          label="Priority"
          value={result.priority}
          badgeClass={PRIORITY_CLASS[result.priority] || ''}
        />
        <ResultCard label="Suggested Reply" value={result.suggestedReply} wide />
        <ResultCard label="Next Action" value={result.nextAction} wide />
      </div>

      <div className="analysis-actions">
        <button
          type="button"
          className="action-btn action-btn--primary"
          onClick={handleCopy}
        >
          {copied ? 'Reply copied' : 'Copy Suggested Reply'}
        </button>
        <button
          type="button"
          className={`action-btn action-btn--secondary${escalated ? ' action-btn--done' : ''}`}
          onClick={handleEscalate}
          disabled={escalated}
        >
          {escalated ? 'Escalated for human review' : 'Mark as Escalated'}
        </button>
      </div>
    </section>
  );
}

export default AnalysisResult;
