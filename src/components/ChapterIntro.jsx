import React from 'react';

/**
 * ChapterIntro — cinematic full-screen chapter intro card.
 * Props: chapter ({ id, title, tagline, description }), totalChapters, onContinue (fn)
 */
export default function ChapterIntro({ chapter, totalChapters, onContinue }) {
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

        <p className="chapter-intro__tagline">"{chapter.tagline}"</p>

        <div className="chapter-intro__line" aria-hidden="true" />

        <p className="chapter-intro__description">{chapter.description}</p>

        <div className="chapter-intro__action">
          <button
            id={`chapter-${chapter.id}-continue-btn`}
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
