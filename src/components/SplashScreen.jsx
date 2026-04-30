import React from 'react';

export default function SplashScreen({ onStart, onResume, savedGame, chapterCount, scenarioCount, principleCount, maxRep }) {
  const formatDate = (ts) => {
    if (!ts) return '';
    return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const progressPct = savedGame
    ? Math.round(((savedGame.scenarioIndex + (savedGame.chapter - 1) * 5) / scenarioCount) * 100)
    : 0;

  return (
    <div className="splash">
      <div className="splash__bg" aria-hidden="true" />
      <div className="splash__grid" aria-hidden="true" />

      <div className="splash__eyebrow">A Design Learning Game</div>
      <h1 className="splash__title">DesignQuest</h1>
      <div className="splash__title-sub">by Launchly</div>
      <p className="splash__tagline">"Every decision shapes the product. And you."</p>

      {savedGame && (
        <div className="resume-card" role="region" aria-label="Saved game found">
          <div className="resume-card__label">↩ SAVED GAME FOUND</div>
          <div className="resume-card__row">
            <div className="resume-card__info">
              <div className="resume-card__chapter">Chapter {savedGame.chapter} · Scenario {savedGame.scenarioIndex + 1}</div>
              <div className="resume-card__meta">Design Rep: {savedGame.score} · {formatDate(savedGame.savedAt)}</div>
            </div>
            <span className="resume-card__level">{savedGame.level || 'Junior Designer'}</span>
          </div>
          <div className="resume-card__bar-wrap">
            <div className="resume-card__bar-label">
              <span>Overall progress</span><span>{progressPct}%</span>
            </div>
            <div className="resume-card__track">
              <div className="resume-card__fill" style={{ width: `${progressPct}%` }} />
            </div>
          </div>
        </div>
      )}

      <div className="splash__meta" role="list">
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

      <p className="splash__ux-note">Built with Nielsen heuristics, WCAG 2.2, and core Laws of UX.</p>

      <div className="splash__cta">
        {savedGame ? (
          <>
            <div className="splash__cta-actions">
              <button type="button" className="btn btn-primary" onClick={onResume} aria-label="Resume saved game">Resume Game →</button>
              <button type="button" className="btn btn-ghost" onClick={onStart} aria-label="Start a new game">New Game</button>
            </div>
            <p className="splash__warn">New game will overwrite saved progress</p>
          </>
        ) : (
          <button className="btn btn-primary" onClick={onStart} aria-label="Start DesignQuest">Start Game →</button>
        )}
      </div>
    </div>
  );
}
