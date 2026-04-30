import React from 'react';
import { getLevel, getNextLevel, DNA_TRAITS, getDNALabel } from '../hooks/useProgression';

export default function ChapterSummary({ chapterNum, chapterTitle, totalScore, maxScore, chapterScore, chapterScenarioCount, totalChapters, dna, titles, onContinue }) {
  const lvl     = getLevel(totalScore);
  const nextLvl = getNextLevel(totalScore);
  const pct     = Math.round((totalScore / maxScore) * 100);

  return (
    <div className="chapter-summary">
      <div className="chapter-summary__inner">
        <div className="chapter-summary__eyebrow">
          Chapter {chapterNum} of {totalChapters} complete · {chapterScenarioCount} scenarios
        </div>
        <h2 className="chapter-summary__title">{chapterTitle}</h2>

        {/* Score */}
        <div className="chapter-summary__score-row">
          <div className="summary-stat">
            <div className="summary-stat__num" style={{ color: lvl.color }}>{totalScore}</div>
            <div className="summary-stat__label">Total Rep</div>
          </div>
          <div className="summary-stat">
            <div className="summary-stat__num">+{chapterScore}</div>
            <div className="summary-stat__label">This Chapter</div>
          </div>
          <div className="summary-stat">
            <div className="summary-stat__num">{pct}%</div>
            <div className="summary-stat__label">Max Score</div>
          </div>
        </div>

        {/* Level */}
        <div className="summary-level">
          <div className="summary-level__badge" style={{ color: lvl.color, borderColor: `${lvl.color}55`, background: `${lvl.color}15` }}>
            {lvl.name}
          </div>
          {nextLvl && (
            <p className="summary-level__next">{nextLvl.minScore - totalScore} Rep to {nextLvl.name}</p>
          )}
        </div>

        {/* DNA Traits */}
        {dna && (
          <div className="summary-dna">
            <div className="summary-dna__label">Your Designer Traits</div>
            <div className="summary-dna__grid">
              {Object.entries(DNA_TRAITS).map(([key, config]) => {
                const val   = dna[key] ?? 50;
                const label = getDNALabel(key, val);
                return (
                  <div key={key} className="dna-card">
                    <div className="dna-card__trait">{config.label}</div>
                    <div className="dna-card__value">{label}</div>
                    <div className="dna-card__bar-wrap">
                      <div className="dna-card__bar" style={{ width: `${val}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Titles */}
        {titles && titles.length > 0 && (
          <div className="summary-titles">
            <div className="summary-titles__label">Earned Titles</div>
            <div className="summary-titles__row">
              {titles.map(t => (
                <span key={t} className="title-tag">{t}</span>
              ))}
            </div>
          </div>
        )}

        <button className="btn btn-primary" onClick={onContinue} aria-label={chapterNum < totalChapters ? 'Continue to next chapter' : 'See final results'}>
          {chapterNum < totalChapters ? `Chapter ${chapterNum + 1} →` : 'See Final Results →'}
        </button>
      </div>
    </div>
  );
}
