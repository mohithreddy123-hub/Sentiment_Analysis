import { useState, useEffect } from 'react';
import { getSessionId } from './lib/supabase';
import { AnalysisResult } from './types';
import { analyzeSentimentLocally } from './lib/analyzer';
import Header from './components/Header';
import AnalysisInput from './components/AnalysisInput';
import ResultPanel from './components/ResultPanel';
import EmptyResult from './components/EmptyResult';
import StatsCards from './components/StatsCards';
import HistoryPanel from './components/HistoryPanel';
import ModelComparison from './components/ModelComparison';
import { AlertCircle } from 'lucide-react';

export default function App() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<AnalysisResult[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    try {
      const saved = localStorage.getItem('sentiment_history');
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load history', e);
    }
  }

  async function handleAnalyze(text: string) {
    setIsLoading(true);
    setError(null);

    try {
      const sessionId = getSessionId();
      
      const data: AnalysisResult = await analyzeSentimentLocally(text, sessionId);

      setResult(data);
      const newHistory = [data, ...history].slice(0, 50);
      setHistory(newHistory);
      localStorage.setItem('sentiment_history', JSON.stringify(newHistory));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Sentiment Analysis Tool
          </h2>
          <p className="text-slate-600 text-sm max-w-xl">
            Analyze text sentiment using traditional ML (TF-IDF), transformer models (BERT), and modern LLMs. 
            View individual model predictions and confidence scores.
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <AnalysisInput onAnalyze={handleAnalyze} isLoading={isLoading} />
          {result ? <ResultPanel result={result} /> : <EmptyResult />}
        </div>

        {result?.models && result.models.length > 0 && (
          <ModelComparison models={result.models} />
        )}

        <StatsCards history={history} />

        <HistoryPanel history={history} />
      </main>


    </div>
  );
}
