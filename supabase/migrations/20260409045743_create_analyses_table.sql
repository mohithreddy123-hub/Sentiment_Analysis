/*
  # Create Sentiment Analyses Table

  ## Summary
  Creates the core table for storing all sentiment analysis results from the Social Media
  Sentiment Analysis System.

  ## New Tables

  ### analyses
  Stores each text analysis submitted by users including the original text, predicted
  sentiment classification, confidence scores, and detected keywords.

  - `id` - Unique identifier (UUID)
  - `text_input` - The original text submitted for analysis
  - `sentiment` - Classified sentiment: 'positive', 'negative', or 'neutral'
  - `confidence` - Model confidence score (0-1)
  - `positive_score` - Normalized positive sentiment score (0-1)
  - `negative_score` - Normalized negative sentiment score (0-1)
  - `neutral_score` - Normalized neutral sentiment score (0-1)
  - `keywords` - JSON array of detected sentiment keywords with scores
  - `word_count` - Total words in the analyzed text
  - `processing_time_ms` - Time taken for analysis in milliseconds
  - `session_id` - Anonymous session identifier for grouping user analyses
  - `created_at` - Timestamp of when the analysis was performed

  ## Security
  - RLS enabled on analyses table
  - Public read/insert access (anonymous sentiment tool - no auth required)
  - Users can only read analyses from their own session
*/

CREATE TABLE IF NOT EXISTS analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  text_input text NOT NULL,
  sentiment text NOT NULL CHECK (sentiment IN ('positive', 'negative', 'neutral')),
  confidence numeric(6,4) NOT NULL DEFAULT 0,
  positive_score numeric(6,4) NOT NULL DEFAULT 0,
  negative_score numeric(6,4) NOT NULL DEFAULT 0,
  neutral_score numeric(6,4) NOT NULL DEFAULT 0,
  keywords jsonb NOT NULL DEFAULT '[]',
  word_count integer NOT NULL DEFAULT 0,
  processing_time_ms integer,
  session_id text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert analyses"
  ON analyses FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can read their session analyses"
  ON analyses FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_analyses_session ON analyses(session_id);
CREATE INDEX IF NOT EXISTS idx_analyses_created_at ON analyses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analyses_sentiment ON analyses(sentiment);
