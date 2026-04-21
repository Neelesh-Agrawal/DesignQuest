import React, { useEffect, useState } from 'react';

const PRINCIPLE_ICONS = {
  'Hick\'s Law + Form Design': '⚡',
  'Hick\'s Law': '⚡',
  'Collaborative Design Process': '🤝',
  'WCAG Contrast Ratios': '👁️',
  'Accessibility & WCAG AA': '♿',
  'Stakeholder Communication': '🗣️',
  'Perceived Performance': '⏳',
  'Skeleton Screens': '🦴',
  'Delight vs. Utility': '✨',
  'Notification Design': '🔔',
  'User Autonomy & Progressive Disclosure': '🎛️',
  'Data-Informed vs. Data-Dependent': '📊',
  'Error Message UX': '❌',
  'Microcopy & Error Messages': '✍️',
  'Tone of Voice': '🎭',
  'User Segmentation': '👥',
  'Progressive Disclosure': '🎯',
  'Research Before Redesign': '🔬',
  'Typographic Hierarchy': '🔠',
  'Typography Systems': '📐',
  'Design Advocacy': '📢',
  'Mobile-First Thinking': '📱',
  'Mobile-First Design': '📱',
  'Responsive Design': '💻',
  'Validated Shipping': '🚦',
  'A/B Testing': '🧪',
  'Staged Rollouts': '🪜',
  'Research as Persuasion': '🎬',
  'Evidence-Based Design': '📋',
};

function getBadgeInfo(delta) {
  if (delta >= 15) return { label: 'Great Call', cls: 'great' };
  if (delta > 0)   return { label: 'Decent Move', cls: 'okay' };
  return { label: 'Painful Lesson', cls: 'bad' };
}

/**
 * ConsequenceScreen — shows what happened + the design principle.
 * Props:
 *   consequence  — { story, lesson, principle, principleDetail }
 *   delta        — score change (number)
 *   onNext(fn)   — advance to next screen
 */
export default function ConsequenceScreen({ consequence, delta, onNext }) {
  const [deltaVisible, setDeltaVisible] = useState(false);

  useEffect(() => {
    // Briefly show the delta pop-in
    const t = setTimeout(() => setDeltaVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  const badge = getBadgeInfo(delta);
  const icon = PRINCIPLE_ICONS[consequence.principle] || '💡';
  const deltaSign = delta >= 0 ? `+${delta}` : `${delta}`;
  const deltaClass = delta > 0 ? 'positive' : delta < 0 ? 'negative' : 'neutral';

  return (
    <div className="consequence">
      <div className="consequence__inner">
        {/* Verdict row */}
        <div className="consequence__verdict">
          <span className={`consequence__badge ${badge.cls}`} role="status">
            {badge.label}
          </span>
          <span
            className={`consequence__score-delta ${deltaClass}`}
            aria-label={`Score changed by ${deltaSign}`}
            style={{ opacity: deltaVisible ? 1 : 0, transition: 'opacity 400ms' }}
          >
            {deltaSign} Rep
          </span>
        </div>

        {/* Story card */}
        <div className="consequence__card story">
          <div className="consequence__card-label">What happened</div>
          <p className="consequence__story">{consequence.story}</p>
          <p className="consequence__lesson">
            <strong>Lesson: </strong>{consequence.lesson}
          </p>
        </div>

        {/* Principle card */}
        <div className="consequence__card principle" role="complementary" aria-label="Design principle">
          <div className="consequence__card-label">Design Principle</div>
          <div className="principle-box">
            <div className="principle-box__header">
              <span className="principle-box__icon" aria-hidden="true">{icon}</span>
              <span className="principle-box__title">{consequence.principle}</span>
            </div>
            <p className="principle-box__detail">{consequence.principleDetail}</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="consequence__actions">
          <button
            id="consequence-next-btn"
            className="btn btn-next"
            onClick={onNext}
            aria-label="Continue to next scenario"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
