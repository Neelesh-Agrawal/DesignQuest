import React from 'react';

/**
 * ScoreBar — fixed top progress indicator.
 * Props: score (number), maxScore (number), delta (number|null), showDelta (bool)
 */
export default function ScoreBar({ score, maxScore, delta, showDelta }) {
  const clampedScore = Math.min(Math.max(score, 0), maxScore);
  const percent = (clampedScore / maxScore) * 100;

  let deltaClass = '';
  let deltaText = '';
  if (delta !== null && delta !== undefined) {
    if (delta > 0) { deltaClass = 'positive'; deltaText = `+${delta}`; }
    else if (delta < 0) { deltaClass = 'negative'; deltaText = `${delta}`; }
    else { deltaClass = 'neutral'; deltaText = '0'; }
  }

  return (
    <div className="score-bar" role="status" aria-label={`Design Rep: ${clampedScore} out of ${maxScore}`}>
      <span className="score-bar__label">Design Rep</span>
      <span className="score-bar__value">{clampedScore} / {maxScore}</span>
      <div className="score-bar__track" aria-hidden="true">
        <div
          className="score-bar__fill"
          style={{ width: `${percent}%` }}
        />
      </div>
      {delta !== null && delta !== undefined && (
        <span
          className={`score-bar__delta ${deltaClass} ${showDelta ? 'visible' : ''}`}
          aria-hidden="true"
        >
          {deltaText}
        </span>
      )}
    </div>
  );
}
