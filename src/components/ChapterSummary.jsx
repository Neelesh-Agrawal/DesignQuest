import React from 'react';

const CHAPTER_EMOJIS = { 1: '🏁', 2: '🚀', 3: '🧭' };

function getChapterVerdict(score, chapterMaxScore) {
  const strongThreshold = chapterMaxScore * 0.75;
  const mediumThreshold = chapterMaxScore * 0.4;
  if (score >= strongThreshold) return { text: "Strong chapter. You pushed back where it counted.", color: 'var(--green)' };
  if (score >= mediumThreshold) return { text: "Solid work. Some calls landed, some didn't.", color: 'var(--yellow)' };
  return { text: "Rough chapter — but every mistake is a lesson.", color: 'var(--red)' };
}

/**
 * ChapterSummary — shown after all 5 scenarios in a chapter.
 * Props:
 *   chapterNum    — 1 or 2
 *   chapterTitle  — string
 *   totalScore    — total accumulated score (not chapter-only)
 *   maxScore      — 220
 *   chapterScore  — points earned this chapter
 *   chapterScenarioCount — number of scenarios in this chapter
 *   totalChapters — total chapters in game
 *   onContinue(fn)
 */
export default function ChapterSummary({
  chapterNum,
  chapterTitle,
  totalScore,
  maxScore,
  chapterScore,
  chapterScenarioCount,
  totalChapters,
  onContinue,
}) {
  const clamped = Math.min(Math.max(totalScore, 0), maxScore);
  const chapterMaxScore = chapterScenarioCount * 15;
  const verdict = getChapterVerdict(chapterScore, chapterMaxScore);
  const emoji = CHAPTER_EMOJIS[chapterNum] || '⭐';

  const nextLabel = chapterNum < totalChapters
    ? `Enter Chapter ${chapterNum + 1} →`
    : 'See My Results →';

  return (
    <div className="chapter-summary">
      <div className="chapter-summary__inner">
        <span className="chapter-summary__icon" aria-hidden="true">{emoji}</span>

        <div className="chapter-summary__label">Chapter {chapterNum} Complete</div>
        <h1 className="chapter-summary__title">{chapterTitle}</h1>

        {/* Score display */}
        <div className="chapter-summary__score-display" role="status" aria-label={`Total score: ${clamped} out of ${maxScore}`}>
          <div className="chapter-summary__score-label">Total Design Rep</div>
          <div>
            <span className="chapter-summary__score-number">{clamped}</span>
            <span className="chapter-summary__score-max"> / {maxScore}</span>
          </div>
        </div>

        {/* Verdict */}
        <p
          className="chapter-summary__desc"
          style={{ color: verdict.color }}
        >
          {verdict.text}
        </p>

        {chapterNum < totalChapters && (
          <p className="chapter-summary__desc" style={{ color: 'var(--text-secondary)' }}>
            {maxScore - clamped > 0
              ? `You still have ${maxScore - clamped} Rep points on the table. Next chapter raises the stakes.`
              : `Perfect chapter. The next one is going to test you even harder.`}
          </p>
        )}

        <button
          id={`chapter-${chapterNum}-summary-btn`}
          className="btn btn-primary"
          onClick={onContinue}
          aria-label={chapterNum < totalChapters ? `Continue to Chapter ${chapterNum + 1}` : 'View final results'}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
