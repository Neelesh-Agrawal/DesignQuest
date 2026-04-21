import React from 'react';
import { getEnding } from '../gameData';

/**
 * FinalScreen — end-game screen with score, tier, story, and all principles recap.
 * Props:
 *   totalScore  — number
 *   maxScore    — number
 *   principles  — array of { principle, lesson } collected throughout the game
 *   totalScenarios — number
 *   onPlayAgain — fn to reset state
 */
export default function FinalScreen({ totalScore, maxScore, principles, totalScenarios, onPlayAgain }) {
  const clamped = Math.min(Math.max(totalScore, 0), maxScore);
  const ending = getEnding(clamped);

  return (
    <div className="final-screen">
      <div className="final-screen__inner">
        {/* Header */}
        <div className="final-screen__header">
          <div
            className="final-screen__badge"
            style={{ color: ending.color, borderColor: ending.color, background: `${ending.color}15` }}
            role="status"
            aria-label={`Your ending: ${ending.title}`}
          >
            {ending.range} Rep
          </div>

          <h1
            className="final-screen__title"
            style={{ color: ending.color }}
          >
            {ending.title}
          </h1>

          <p className="final-screen__subtitle">"{ending.subtitle}"</p>
        </div>

        {/* Score row */}
        <div className="final-screen__score-row" aria-label={`Final score: ${clamped} out of ${maxScore}`}>
          <span
            className="final-screen__score"
            style={{ color: ending.color, textShadow: `0 0 40px ${ending.color}40` }}
          >
            {clamped}
          </span>
          <div className="final-screen__score-details">
            <div className="final-screen__score-label">Design Rep</div>
            <div className="final-screen__score-label">out of {maxScore}</div>
            <div
              className="final-screen__score-tier"
              style={{ color: ending.color }}
            >
              {ending.title}
            </div>
          </div>
        </div>

        {/* Story outcome */}
        <div className="final-screen__story" role="article" aria-label="Your story outcome">
          <p>{ending.description}</p>
        </div>

        {/* Principles learned */}
        <div className="lessons-section">
          <div className="lessons-section__title">{totalScenarios} Things You Learned</div>
          <div className="lessons-list" role="list" aria-label="Design principles learned">
            {principles.map((item, idx) => (
              <div
                key={idx}
                className="lesson-item"
                role="listitem"
                aria-label={`Lesson ${idx + 1}: ${item.principle}`}
              >
                <div className="lesson-item__number">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <div className="lesson-item__content">
                  <div className="lesson-item__principle">{item.principle}</div>
                  <div className="lesson-item__lesson">{item.lesson}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="final-screen__actions">
          <button
            id="play-again-btn"
            className="btn btn-primary"
            onClick={onPlayAgain}
            aria-label="Play DesignQuest again from the beginning"
          >
            Play Again
          </button>
          <button
            id="share-score-btn"
            className="btn btn-ghost"
            onClick={() => {
              const text = `I scored ${clamped}/${maxScore} in DesignQuest and earned the "${ending.title}" ending! 🎮✏️`;
              if (navigator.share) {
                navigator.share({ title: 'DesignQuest', text }).catch(() => {});
              } else if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(() => alert('Score copied to clipboard!')).catch(() => {});
              }
            }}
            aria-label="Share your score"
          >
            Share Score ↗
          </button>
        </div>
      </div>
    </div>
  );
}
