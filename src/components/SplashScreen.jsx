import React from 'react';

/**
 * SplashScreen — opening screen with title, tagline, and Start Game button.
 * Props: onStart (fn), chapterCount, scenarioCount, principleCount, maxRep
 */
export default function SplashScreen({ onStart, chapterCount, scenarioCount, principleCount, maxRep }) {
  return (
    <div className="splash">
      <div className="splash__bg" aria-hidden="true" />
      <div className="splash__grid" aria-hidden="true" />

      <div className="splash__eyebrow">A Design Learning Game</div>

      <h1 className="splash__title">DesignQuest</h1>
      <div className="splash__title-sub">by Launchly</div>

      <p className="splash__tagline">
        "Every decision shapes the product. And you."
      </p>

      <div className="splash__meta" role="list" aria-label="Game overview">
        <div className="splash__meta-item" role="listitem">
          <span className="splash__meta-value">{chapterCount}</span>
          <span className="splash__meta-label">Chapters</span>
        </div>
        <div className="splash__divider" aria-hidden="true" />
        <div className="splash__meta-item" role="listitem">
          <span className="splash__meta-value">{scenarioCount}</span>
          <span className="splash__meta-label">Scenarios</span>
        </div>
        <div className="splash__divider" aria-hidden="true" />
        <div className="splash__meta-item" role="listitem">
          <span className="splash__meta-value">{principleCount}</span>
          <span className="splash__meta-label">Principles</span>
        </div>
        <div className="splash__divider" aria-hidden="true" />
        <div className="splash__meta-item" role="listitem">
          <span className="splash__meta-value">{maxRep}</span>
          <span className="splash__meta-label">Max Rep</span>
        </div>
      </div>

      <p className="splash__ux-note" aria-label="UX standards used in this game">
        Built with Nielsen heuristics, WCAG 2.2 accessibility guidance, and core Laws of UX.
      </p>

      <div className="splash__cta">
        <button
          id="start-game-btn"
          className="btn btn-primary"
          onClick={onStart}
          aria-label="Start DesignQuest game"
        >
          Start Game →
        </button>
      </div>
    </div>
  );
}
