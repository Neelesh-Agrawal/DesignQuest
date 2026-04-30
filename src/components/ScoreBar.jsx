import React from 'react';
import { getLevel, getNextLevel } from '../hooks/useProgression';

export default function ScoreBar({ score, maxScore, delta, showDelta }) {
  const clamped  = Math.min(Math.max(score, 0), maxScore);
  const pct      = (clamped / maxScore) * 100;
  const lvl      = getLevel(clamped);
  const nextLvl  = getNextLevel(clamped);

  let deltaClass = '', deltaText = '';
  if (delta !== null && delta !== undefined) {
    if (delta > 0)      { deltaClass = 'positive'; deltaText = `+${delta}`; }
    else if (delta < 0) { deltaClass = 'negative'; deltaText = `${delta}`; }
    else                { deltaClass = 'neutral';  deltaText = '0'; }
  }

  return (
    <div className="score-bar" role="status" aria-label={`Design Rep: ${clamped} out of ${maxScore}`}>
      <span className="score-bar__label">Design Rep</span>
      <span className="score-bar__value">{clamped} / {maxScore}</span>
      <div className="score-bar__track" aria-hidden="true">
        <div className="score-bar__fill" style={{ width: `${pct}%` }} />
      </div>
      <span
        className="score-bar__level-badge"
        style={{ color: lvl.color, borderColor: `${lvl.color}55`, background: `${lvl.color}15` }}
        title={nextLvl ? `${nextLvl.minScore - clamped} Rep to ${nextLvl.name}` : 'Max level reached'}
      >
        {lvl.name}
      </span>
      {delta !== null && delta !== undefined && (
        <span className={`score-bar__delta ${deltaClass} ${showDelta ? 'visible' : ''}`} aria-hidden="true">
          {deltaText}
        </span>
      )}
    </div>
  );
}
