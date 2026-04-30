import React from 'react';

/**
 * ChapterIntro — full-screen chapter opener.
 * Props: chapter ({ id, title, tagline, description }), totalChapters, onContinue
 */
export default function ChapterIntro({ chapter, totalChapters, onContinue }) {
  if (!chapter) return null;

  return (
    <div className="chapter-intro">
      <div className="chapter-intro__bg" aria-hidden="true">
        <div className="chapter-intro__bg-gradient" />
      </div>

      <div className="chapter-intro__content">
        <div className="chapter-intro__number" aria-label={`Chapter ${chapter.id} of ${totalChapters}`}>
          Chapter {chapter.id} of {totalChapters}
        </div>

        <h1 className="chapter-intro__title">{chapter.title}</h1>

        <p className="chapter-intro__tagline">&ldquo;{chapter.tagline}&rdquo;</p>

        <div className="chapter-intro__line" aria-hidden="true" />

        <p className="chapter-intro__description">{chapter.description}</p>

        <div className="chapter-intro__action">
          <button
            id={`chapter-${chapter.id}-continue-btn`}
            type="button"
            className="btn btn-primary"
            onClick={onContinue}
            aria-label={`Begin Chapter ${chapter.id}: ${chapter.title}`}
          >
            Begin Chapter {chapter.id} →
          </button>
        </div>
      </div>
    </div>
  );
}
