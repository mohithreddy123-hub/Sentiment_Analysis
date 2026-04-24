import { AnalysisResult } from '../types';

const positiveWords: Record<string, number> = {
  good: 1.0, great: 1.5, excellent: 2.0, amazing: 2.0, wonderful: 1.8,
  fantastic: 1.8, terrific: 1.7, outstanding: 2.0, superb: 1.9, brilliant: 1.8,
  awesome: 1.7, love: 1.5, loved: 1.5, loving: 1.4, like: 0.8, liked: 0.8,
  enjoy: 1.2, enjoyed: 1.2, happy: 1.5, happiness: 1.6, glad: 1.2,
  pleased: 1.2, pleasure: 1.3, delight: 1.5, delighted: 1.6, delightful: 1.6,
  joy: 1.5, joyful: 1.6, beautiful: 1.5, pretty: 1.2, nice: 1.0, kind: 1.1,
  friendly: 1.2, helpful: 1.3, positive: 1.0, perfect: 2.0, best: 1.5,
  better: 0.8, impressive: 1.5, incredible: 1.8, extraordinary: 1.9,
  magnificent: 1.9, marvelous: 1.8, spectacular: 1.9, phenomenal: 2.0,
  exceptional: 1.9, remarkable: 1.7, praise: 1.4, recommend: 1.3,
  recommended: 1.3, worth: 0.8, worthwhile: 1.2, success: 1.5, successful: 1.5,
  win: 1.2, winner: 1.3, winning: 1.3, victory: 1.5, achieve: 1.2,
  achievement: 1.4, accomplished: 1.4, excited: 1.4, exciting: 1.4,
  enthusiastic: 1.4, grateful: 1.4, thankful: 1.3, appreciate: 1.2,
  appreciated: 1.3, valuable: 1.2, quality: 1.0, efficient: 1.2,
  effective: 1.2, reliable: 1.2, trustworthy: 1.3, honest: 1.1, fair: 1.0,
  innovative: 1.3, creative: 1.2, smart: 1.1, intelligent: 1.2, skilled: 1.1,
  talented: 1.2, professional: 1.1, responsive: 1.0, fast: 0.8, quick: 0.8,
  smooth: 1.0, easy: 0.9, simple: 0.8, clean: 0.9, fresh: 0.9,
  convenient: 1.1, comfortable: 1.1, satisfying: 1.2, satisfied: 1.2,
  fun: 1.2, entertaining: 1.2, enjoyable: 1.3, pleasant: 1.2, superstar: 1.8,
  breathtaking: 2.0, charming: 1.4, cheerful: 1.4, elegant: 1.3, flawless: 1.9,
  generous: 1.3, gorgeous: 1.5, graceful: 1.3, inspiring: 1.5,
  lively: 1.2, lovely: 1.5, lucky: 1.1, passionate: 1.3, peaceful: 1.2,
  polite: 1.1, powerful: 1.2, productive: 1.2, profound: 1.3, rich: 0.9,
  robust: 1.1, safe: 1.0, secure: 1.1, serene: 1.2, sharp: 1.0, solid: 1.0,
  sophisticated: 1.2, stable: 1.0, stellar: 1.7, stunning: 1.7, superior: 1.5,
  sweet: 1.2, thoughtful: 1.2, vibrant: 1.3, warm: 1.1,
  welcoming: 1.2, wise: 1.1, worthy: 1.1, splendid: 1.7,
  admire: 1.3, adore: 1.5, affectionate: 1.3, bliss: 1.6, blessed: 1.5,
  brave: 1.2, calm: 1.0, capable: 1.1, caring: 1.2, celebrate: 1.3,
  confident: 1.2, courageous: 1.3, dedicated: 1.2, devoted: 1.3,
  dynamic: 1.2, empowered: 1.3, energetic: 1.3, engaging: 1.2,
};

const negativeWords: Record<string, number> = {
  bad: 1.0, terrible: 2.0, awful: 1.9, horrible: 1.9, dreadful: 1.8,
  poor: 1.2, worst: 2.0, fail: 1.4, failed: 1.4, failure: 1.5,
  broken: 1.3, useless: 1.5, worthless: 1.6, waste: 1.4, disappointed: 1.5,
  disappointing: 1.5, disappointment: 1.5, unhappy: 1.4, sad: 1.3, upset: 1.3,
  angry: 1.5, annoyed: 1.3, annoying: 1.4, frustrated: 1.4, frustrating: 1.4,
  frustration: 1.4, hate: 1.8, hated: 1.8, despise: 1.9, disgusting: 1.8,
  disgust: 1.7, disgusted: 1.7, nasty: 1.5, ugly: 1.3, dirty: 1.2,
  wrong: 1.0, incorrect: 1.0, defective: 1.4, damaged: 1.3, flawed: 1.2,
  slow: 1.0, delayed: 1.1, unreliable: 1.3, unhelpful: 1.3, rude: 1.5,
  unprofessional: 1.4, dishonest: 1.5, unfair: 1.3, scam: 2.0, fraud: 2.0,
  problem: 1.0, issue: 0.8, error: 1.0, bug: 0.9, crash: 1.4, glitch: 1.0,
  complaint: 1.2, expensive: 0.9, overpriced: 1.3, inferior: 1.4,
  mediocre: 1.2, boring: 1.2, dull: 1.1, tedious: 1.2, bland: 1.0,
  outdated: 1.0, lacking: 1.1, missing: 0.9, incomplete: 1.1,
  abysmal: 1.9, atrocious: 1.9, abominable: 1.9, appalling: 1.7,
  despicable: 1.8, detestable: 1.8, disastrous: 1.8,
  egregious: 1.8, execrable: 1.9, horrendous: 1.9, horrific: 1.8,
  miserable: 1.7, nightmarish: 1.9, outrageous: 1.6, pathetic: 1.6,
  pitiful: 1.5, reprehensible: 1.8, ridiculous: 1.3, shameful: 1.6,
  shameless: 1.5, subpar: 1.2, unfortunate: 1.1, unacceptable: 1.5,
  unreasonable: 1.2, vile: 1.8, wretched: 1.7, chaotic: 1.3, corrupt: 1.5,
  cruel: 1.6, dangerous: 1.3, deceitful: 1.5, deficient: 1.2, deplorable: 1.7,
  destructive: 1.4, difficult: 0.8, disorganized: 1.1, disrespectful: 1.5,
  distressing: 1.4, dysfunctional: 1.4, embarrassing: 1.3, erroneous: 1.1,
  evil: 1.8, excessive: 1.0, exhausting: 1.2, fake: 1.3, flimsy: 1.1,
  harmful: 1.4, harsh: 1.2, hostile: 1.4, ignorant: 1.3, incompetent: 1.5,
  inept: 1.4, insecure: 1.1, irresponsible: 1.4,
  lazy: 1.2, lousy: 1.4, manipulative: 1.5, monstrous: 1.7, negligent: 1.4,
  offensive: 1.5, overwhelming: 1.0, painful: 1.4, pointless: 1.3,
  polluted: 1.3, predatory: 1.5, pretentious: 1.2, primitive: 0.9,
  problematic: 1.2, redundant: 1.0, regrettable: 1.3, repulsive: 1.7,
  rigid: 0.9, rotten: 1.5, ruthless: 1.4, severe: 1.1, sloppy: 1.2,
  stressful: 1.2, stubborn: 1.1, toxic: 1.6, tragic: 1.5, traumatic: 1.6,
  troublesome: 1.2, unfriendly: 1.3, unjust: 1.4, unnecessary: 1.0,
  unstable: 1.2, violent: 1.6, vulnerable: 1.0, weak: 1.0,
};

const intensifiers: Record<string, number> = {
  very: 1.5, extremely: 2.0, incredibly: 1.8, absolutely: 1.8,
  totally: 1.6, completely: 1.7, utterly: 1.9, highly: 1.4,
  really: 1.3, so: 1.2, super: 1.5, quite: 1.1, rather: 1.1,
  truly: 1.4, genuinely: 1.3, definitely: 1.3, deeply: 1.4,
  profoundly: 1.5, remarkably: 1.5, exceptionally: 1.6, awfully: 1.4,
  terribly: 1.4, seriously: 1.3, immensely: 1.7, enormously: 1.7,
};

const negators = new Set([
  "not", "no", "never", "isn't", "wasn't", "weren't", "doesn't",
  "didn't", "don't", "can't", "won't", "wouldn't", "shouldn't",
  "couldn't", "hardly", "barely", "scarcely", "without", "neither", "nor",
  "isnt", "wasnt", "werent", "doesnt", "didnt", "dont", "cant",
  "wont", "wouldnt", "shouldnt", "couldnt",
]);

interface Keyword {
  word: string;
  type: "positive" | "negative";
  score: number;
}

interface ModelResult {
  model: "tfidf_lr" | "bert" | "llm";
  sentiment: "positive" | "negative" | "neutral";
  confidence: number;
  positive_score: number;
  negative_score: number;
  neutral_score: number;
  processing_time_ms: number;
}

function preprocess(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s']/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1);
}

function analyzeTfIdfLr(text: string) {
  const startTime = Date.now();
  const tokens = preprocess(text);
  const wordCount = tokens.length;

  let positiveScore = 0;
  let negativeScore = 0;
  const keywords: Keyword[] = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const isNegated = (i > 0 && negators.has(tokens[i - 1])) || (i > 1 && negators.has(tokens[i - 2]));
    let multiplier = 1.0;
    if (i > 0 && intensifiers[tokens[i - 1]]) {
      multiplier = intensifiers[tokens[i - 1]];
    } else if (i > 1 && intensifiers[tokens[i - 2]]) {
      multiplier = intensifiers[tokens[i - 2]] * 0.7;
    }

    if (positiveWords[token]) {
      const raw = positiveWords[token] * multiplier;
      if (isNegated) {
        negativeScore += raw * 0.6;
        keywords.push({ word: token, type: "negative", score: raw * 0.6 });
      } else {
        positiveScore += raw;
        keywords.push({ word: token, type: "positive", score: raw });
      }
    } else if (negativeWords[token]) {
      const raw = negativeWords[token] * multiplier;
      if (isNegated) {
        positiveScore += raw * 0.4;
        keywords.push({ word: token, type: "positive", score: raw * 0.4 });
      } else {
        negativeScore += raw;
        keywords.push({ word: token, type: "negative", score: -raw });
      }
    }
  }

  const totalRaw = positiveScore + negativeScore;
  let sentiment: "positive" | "negative" | "neutral";
  let confidence: number;
  let normPos: number;
  let normNeg: number;
  let normNeu: number;

  if (totalRaw === 0 || wordCount < 2) {
    sentiment = "neutral";
    confidence = 0.62;
    normPos = 0.1;
    normNeg = 0.1;
    normNeu = 0.8;
  } else {
    const posRatio = positiveScore / totalRaw;
    const negRatio = negativeScore / totalRaw;
    const density = totalRaw / wordCount;
    const clampedDensity = Math.min(density / 2.0, 1.0);

    if (posRatio >= 0.55) {
      sentiment = "positive";
      confidence = Math.min(0.97, 0.52 + posRatio * 0.45 + clampedDensity * 0.08);
    } else if (negRatio >= 0.55) {
      sentiment = "negative";
      confidence = Math.min(0.97, 0.52 + negRatio * 0.45 + clampedDensity * 0.08);
    } else {
      sentiment = "neutral";
      confidence = Math.min(0.85, 0.55 + (1 - Math.abs(posRatio - negRatio)) * 0.2);
    }

    const denom = totalRaw + wordCount * 0.15;
    normPos = parseFloat((positiveScore / denom).toFixed(4));
    normNeg = parseFloat((negativeScore / denom).toFixed(4));
    normNeu = parseFloat(Math.max(0, 1 - normPos - normNeg).toFixed(4));
  }

  keywords.sort((a, b) => Math.abs(b.score) - Math.abs(a.score));

  return {
    sentiment,
    confidence: parseFloat(confidence.toFixed(4)),
    positive_score: normPos,
    negative_score: normNeg,
    neutral_score: normNeu,
    keywords: keywords.slice(0, 8),
    word_count: wordCount,
    processing_time_ms: Date.now() - startTime,
  };
}

function simulateBERT(text: string) {
  const startTime = Date.now();
  const tokens = preprocess(text);
  const result = analyzeTfIdfLr(text);

  // Simulate BERT: 15-25% variation from TF-IDF
  const variance = 0.15 + Math.random() * 0.1;
  const newPos = Math.min(1, result.positive_score * (1 + variance * (Math.random() - 0.5)));
  const newNeg = Math.min(1, result.negative_score * (1 + variance * (Math.random() - 0.5)));
  const total = newPos + newNeg;
  const normPos = total > 0 ? newPos / (total + result.neutral_score * 0.8) : 0.33;
  const normNeg = total > 0 ? newNeg / (total + result.neutral_score * 0.8) : 0.33;
  const normNeu = 1 - normPos - normNeg;

  let sentiment: "positive" | "negative" | "neutral";
  if (normPos > Math.max(normNeg, normNeu)) sentiment = "positive";
  else if (normNeg > Math.max(normPos, normNeu)) sentiment = "negative";
  else sentiment = "neutral";

  return {
    sentiment,
    confidence: parseFloat((0.75 + Math.random() * 0.2).toFixed(4)),
    positive_score: parseFloat(normPos.toFixed(4)),
    negative_score: parseFloat(normNeg.toFixed(4)),
    neutral_score: parseFloat(normNeu.toFixed(4)),
    keywords: result.keywords,
    word_count: tokens.length,
    processing_time_ms: Date.now() - startTime + Math.floor(Math.random() * 50),
  };
}

function simulateLLM(text: string) {
  const startTime = Date.now();
  const tokens = preprocess(text);
  const result = analyzeTfIdfLr(text);

  // Simulate LLM: more conservative, 20-30% variation
  const variance = 0.2 + Math.random() * 0.1;
  const newPos = Math.min(1, result.positive_score * (1 + variance * (Math.random() - 0.5)));
  const newNeg = Math.min(1, result.negative_score * (1 + variance * (Math.random() - 0.5)));
  const total = newPos + newNeg;
  const normPos = total > 0 ? newPos / (total + result.neutral_score) : 0.33;
  const normNeg = total > 0 ? newNeg / (total + result.neutral_score) : 0.33;
  const normNeu = 1 - normPos - normNeg;

  let sentiment: "positive" | "negative" | "neutral";
  if (normPos > Math.max(normNeg, normNeu)) sentiment = "positive";
  else if (normNeg > Math.max(normPos, normNeu)) sentiment = "negative";
  else sentiment = "neutral";

  return {
    sentiment,
    confidence: parseFloat((0.70 + Math.random() * 0.25).toFixed(4)),
    positive_score: parseFloat(normPos.toFixed(4)),
    negative_score: parseFloat(normNeg.toFixed(4)),
    neutral_score: parseFloat(normNeu.toFixed(4)),
    keywords: result.keywords,
    word_count: tokens.length,
    processing_time_ms: Date.now() - startTime + Math.floor(Math.random() * 80),
  };
}

function ensembleVote(models: ModelResult[]) {
  const votes = { positive: 0, negative: 0, neutral: 0 };
  let totalConfidence = 0;

  models.forEach((m) => {
    votes[m.sentiment]++;
    totalConfidence += m.confidence;
  });

  let ensembleSentiment: "positive" | "negative" | "neutral";
  if (votes.positive > votes.negative && votes.positive > votes.neutral) {
    ensembleSentiment = "positive";
  } else if (votes.negative > votes.positive && votes.negative > votes.neutral) {
    ensembleSentiment = "negative";
  } else {
    ensembleSentiment = "neutral";
  }

  const ensembleConfidence = parseFloat((totalConfidence / models.length).toFixed(4));
  const ensemblePos = parseFloat((models.reduce((s, m) => s + m.positive_score, 0) / models.length).toFixed(4));
  const ensembleNeg = parseFloat((models.reduce((s, m) => s + m.negative_score, 0) / models.length).toFixed(4));
  const ensembleNeu = parseFloat((models.reduce((s, m) => s + m.neutral_score, 0) / models.length).toFixed(4));

  return {
    sentiment: ensembleSentiment,
    confidence: ensembleConfidence,
    positive_score: ensemblePos,
    negative_score: ensembleNeg,
    neutral_score: ensembleNeu,
    ensemble_method: "majority_vote",
  };
}

export async function analyzeSentimentLocally(text: string, session_id: string): Promise<AnalysisResult> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const tfidfResult = analyzeTfIdfLr(text.trim());
  const bertResult = simulateBERT(text.trim());
  const llmResult = simulateLLM(text.trim());

  const models: ModelResult[] = [
    { model: "tfidf_lr", ...tfidfResult },
    { model: "bert", ...bertResult },
    { model: "llm", ...llmResult },
  ];

  const ensemble = ensembleVote(models);
  const totalTime = models.reduce((s, m) => s + m.processing_time_ms, 0);

  return {
    ...ensemble,
    ...tfidfResult,
    id: crypto.randomUUID(),
    models,
    processing_time_ms: totalTime,
    text_input: text.trim(),
    created_at: new Date().toISOString(),
    session_id
  };
}
