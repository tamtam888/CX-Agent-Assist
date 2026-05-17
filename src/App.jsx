import { useState } from 'react';
import MessageInput from './components/MessageInput';
import AnalysisResult from './components/AnalysisResult';
import { analyzeMessage } from './utils/mockAnalysis';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleAnalyze() {
    if (!message.trim()) return;
    setIsLoading(true);
    setResult(null);
    const analysis = await analyzeMessage(message);
    setResult(analysis);
    setIsLoading(false);
  }

  function handleClear() {
    setMessage('');
    setResult(null);
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header__inner">
          <h1 className="app-header__title">CX Agent Assist</h1>
          <p className="app-header__subtitle">
            Analyze customer messages and generate structured support insights
          </p>
        </div>
      </header>
      <main className="app-main">
        <MessageInput
          message={message}
          onChange={setMessage}
          onAnalyze={handleAnalyze}
          onClear={handleClear}
          isLoading={isLoading}
        />
        {isLoading && <p className="app-loading">Analyzing message...</p>}
        {result && <AnalysisResult result={result} />}
      </main>
    </div>
  );
}

export default App;
