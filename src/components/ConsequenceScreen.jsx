import React, { useEffect, useState, useRef } from 'react';
import { createMessage, hasLlmKey } from '../lib/llm';

const LLM_READY = hasLlmKey();

const PRINCIPLE_ICONS = {
  "Hick's Law": '⚡', "Hick's Law + Form Design": '⚡',
  'Collaborative Design Process': '🤝', 'WCAG Contrast Ratios': '👁️',
  'Accessibility & WCAG AA': '♿', 'Stakeholder Communication': '🗣️',
  'Perceived Performance': '⏳', 'Skeleton Screens': '🦴',
  'Delight vs. Utility': '✨', 'Notification Design': '🔔',
  'User Autonomy & Progressive Disclosure': '🎛️', 'Data-Informed vs. Data-Dependent': '📊',
  'Error Message UX': '❌', 'Microcopy & Error Messages': '✍️',
  'Tone of Voice': '🎭', 'User Segmentation': '👥',
  'Progressive Disclosure': '🎯', 'Research Before Redesign': '🔬',
  'Typographic Hierarchy': '🔠', 'Typography Systems': '📐',
  'Design Advocacy': '📢', 'Mobile-First Thinking': '📱',
  'Mobile-First Design': '📱', 'Responsive Design': '💻',
  'Validated Shipping': '🚦', 'A/B Testing': '🧪',
  'Staged Rollouts': '🪜', 'Research as Persuasion': '🎬',
  'Evidence-Based Design': '📋', "Jakob's Law": '🧭',
  'Doherty Threshold': '⚡', 'Zeigarnik Effect': '🔄',
  'Default Effect': '🎲', 'Von Restorff Effect': '🎪',
  'Peak-End Rule': '🏁', 'Anchoring Bias': '⚓',
  'Dark Patterns': '🚫', 'Nudge Theory': '👉',
  'Social Proof': '💬', 'Gestalt — Proximity': '📐',
  'Gestalt — Similarity': '🔗', 'Gestalt — Figure-Ground': '🖼️',
  'Aesthetic-Usability Effect': '🎨', "Fitts's Law": '🎯',
  'Cognitive Accessibility': '🧠', 'Motion & Animation Safety': '🎞️',
  'Icon Clarity & Metaphor': '🔍', 'Colour Theory & Convention': '🎨',
  'Visual Weight & Balance': '⚖️', 'Law of Pragnanz': '🔲',
  'Mental Models': '🗺️', 'Usability Testing': '🔬',
  'Jobs-to-be-Done': '💼', 'Affinity Mapping': '🗂️',
  'Design Sprints': '🏃', 'Design Systems': '🏗️',
  'Design Debt': '💳', "Tesler's Law": '⚙️',
  'Component Reuse': '♻️', 'Dual-Process Thinking': '🧠',
  'Consistency and Standards': '📏', 'Help and Documentation': '📖',
  'Error Prevention': '🛡️', 'Visibility of System Status': '📡',
  'Recognition Rather Than Recall': '👁️', "Miller's Law": '🔢',
  'Non-text Contrast': '🌗', "WCAG 2.2 Focus Visibility": '🎯',
  'Keyboard Accessibility': '⌨️',
};

const METRICS = {
  15: { conversion: '+12–18%', satisfaction: '↑ High', impact: 'Positive' },
  5:  { conversion: '+2–5%',   satisfaction: '→ Neutral', impact: 'Mixed' },
  0:  { conversion: '±0%',     satisfaction: '→ Neutral', impact: 'Neutral' },
  '-10': { conversion: '-8–15%', satisfaction: '↓ Low', impact: 'Negative' },
};

function getMetrics(delta) {
  if (delta >= 15) return METRICS[15];
  if (delta > 0)   return METRICS[5];
  if (delta === 0) return METRICS[0];
  return METRICS['-10'];
}

function getBadge(delta) {
  if (delta >= 15) return { label: 'Great Call', cls: 'great' };
  if (delta > 0)   return { label: 'Decent Move', cls: 'okay' };
  return { label: 'Painful Lesson', cls: 'bad' };
}

export default function ConsequenceScreen({
  scenario, consequence, choiceId, delta, onNext, uiTask,
}) {
  const [deltaVisible, setDeltaVisible]   = useState(false);
  const [criticText, setCriticText]       = useState('');
  const [criticLoading, setCriticLoading] = useState(true);
  const [defendText, setDefendText]       = useState('');
  const [aiReply, setAiReply]             = useState('');
  const [replyLoading, setReplyLoading]   = useState(false);
  const [defended, setDefended]           = useState(false);
  const [defError, setDefError]           = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setDeltaVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  // AI Critic — fetch after mount (initial criticLoading is true; key on parent resets state per scenario)
  useEffect(() => {
    let cancelled = false;

    async function fetchCritic() {
      if (!LLM_READY) {
        if (!cancelled) { setCriticText(''); setCriticLoading(false); }
        return;
      }
      try {
        const choiceText = uiTask
          ? `Selected option ${choiceId} in the interactive task`
          : scenario?.choices?.find(c => c.id === choiceId)?.text || choiceId;

        const prompt = `You are a senior UX design mentor reviewing a student's decision in DesignQuest, a design learning game.

Scenario: "${uiTask ? uiTask.title : scenario?.title}"
The student chose: "${choiceText}"
Outcome: ${consequence.story}
Design principle: ${consequence.principle}

Give a short mentor-style analysis in exactly 3 lines (no bullet points, no headers, no numbering):
Line 1: What this choice signals about their design thinking (1 sentence, max 20 words)
Line 2: When this choice would actually be the right call (1 sentence, max 20 words)
Line 3: The key trade-off they accepted (1 sentence, max 20 words)

Be specific to this scenario, direct, and honest. Do not repeat the outcome text.`;

        const text = await createMessage(prompt, 300);
        if (!cancelled) setCriticText(text);
      } catch {
        if (!cancelled) setCriticText('');
      } finally {
        if (!cancelled) setCriticLoading(false);
      }
    }

    fetchCritic();
    return () => { cancelled = true; };
  }, [scenario?.id, scenario?.title, scenario?.choices, choiceId, uiTask, consequence.story, consequence.principle]);

  const handleDefend = async () => {
    if (defendText.trim().length < 5) {
      setDefError('Write at least a few words to continue.');
      textareaRef.current?.focus();
      return;
    }
    setDefError('');
    setReplyLoading(true);

    if (!LLM_READY) {
      // No API key — allow proceed without AI response
      setAiReply('');
      setDefended(true);
      setReplyLoading(false);
      return;
    }

    try {
      const choiceText = uiTask
        ? `Selected option ${choiceId} in the interactive task`
        : scenario?.choices?.find(c => c.id === choiceId)?.text || choiceId;

      const prompt = `You are a warm but honest senior UX design mentor in DesignQuest.

Scenario: "${uiTask ? uiTask.title : scenario?.title}"
Student chose: "${choiceText}"
Actual outcome: ${consequence.story}
Design principle: ${consequence.principle}
Student's reasoning: "${defendText}"

Respond in 2-3 sentences. First acknowledge what's valid in their reasoning. Then point out the most important thing they missed. End with one actionable insight they can carry forward. Max 80 words. No bullet points. Warm but direct tone.`;

      const text = await createMessage(prompt, 300);
      setAiReply(text);
    } catch {
      setAiReply('');
    } finally {
      setReplyLoading(false);
      setDefended(true);
    }
  };

  const badge   = getBadge(delta);
  const icon    = PRINCIPLE_ICONS[consequence.principle] || '💡';
  const metrics = getMetrics(delta);
  const deltaSign  = delta >= 0 ? `+${delta}` : `${delta}`;
  const deltaClass = delta > 0 ? 'positive' : delta < 0 ? 'negative' : 'neutral';

  return (
    <div className="consequence">
      <div className="consequence__inner">

        {/* Verdict */}
        <div className="consequence__verdict">
          <span className={`consequence__badge ${badge.cls}`}>{badge.label}</span>
          <span
            className={`consequence__score-delta ${deltaClass}`}
            style={{ opacity: deltaVisible ? 1 : 0, transition: 'opacity 400ms' }}
          >{deltaSign} Rep</span>
        </div>

        {/* Business Metrics */}
        <div className="consequence__metrics">
          <div className="metric-pill">
            <span className="metric-pill__label">Conversion</span>
            <span className="metric-pill__value">{metrics.conversion}</span>
          </div>
          <div className="metric-pill">
            <span className="metric-pill__label">Satisfaction</span>
            <span className="metric-pill__value">{metrics.satisfaction}</span>
          </div>
          <div className="metric-pill">
            <span className="metric-pill__label">Business Impact</span>
            <span className={`metric-pill__value impact-${delta >= 15 ? 'pos' : delta < 0 ? 'neg' : 'neu'}`}>{metrics.impact}</span>
          </div>
        </div>

        {/* Story */}
        <div className="consequence__card story">
          <div className="consequence__card-label">What happened</div>
          <p className="consequence__story">{consequence.story}</p>
          <p className="consequence__lesson"><strong>Lesson: </strong>{consequence.lesson}</p>
        </div>

        {/* Principle */}
        <div className="consequence__card principle">
          <div className="consequence__card-label">Design Principle</div>
          <div className="principle-box">
            <div className="principle-box__header">
              <span className="principle-box__icon" aria-hidden="true">{icon}</span>
              <span className="principle-box__title">{consequence.principle}</span>
            </div>
            <p className="principle-box__detail">{consequence.principleDetail}</p>
          </div>
        </div>

        {/* AI Critic */}
        <div className="consequence__card critic">
          <div className="consequence__card-label">🤖 AI Design Critic</div>
          {!LLM_READY ? (
            <p className="critic-line muted">Add <code>VITE_GROQ_API_KEY</code> (recommended) or <code>VITE_ANTHROPIC_API_KEY</code> to <code>.env</code> to enable AI feedback.</p>
          ) : criticLoading ? (
            <div className="critic-loading">
              <span className="critic-dot" /><span className="critic-dot" /><span className="critic-dot" />
              <span className="critic-loading-text">Analysing your decision…</span>
            </div>
          ) : criticText ? (
            <div className="critic-lines">
              {criticText.split('\n').filter(l => l.trim()).map((line, i) => (
                <p key={i} className="critic-line">{line}</p>
              ))}
            </div>
          ) : (
            <p className="critic-line muted">Could not load analysis. Continue below.</p>
          )}
        </div>

        {/* Defend */}
        {!defended ? (
          <div className="consequence__card defend">
            <div className="consequence__card-label">🧑‍💻 Defend Your Decision</div>
            <p className="defend-prompt">Optional: explain why you chose this to get personalised mentor feedback — or skip and use Next.</p>
            <textarea
              ref={textareaRef}
              className="defend-textarea"
              placeholder="I chose this because..."
              value={defendText}
              onChange={e => { setDefendText(e.target.value); setDefError(''); }}
              rows={3}
              aria-label="Defend your design decision"
            />
            {defError && <p className="defend-error" role="alert">{defError}</p>}
            <button
              className="btn btn-defend"
              onClick={handleDefend}
              disabled={replyLoading}
            >
              {replyLoading ? 'Getting feedback…' : 'Get Feedback →'}
            </button>
          </div>
        ) : (
          <div className="consequence__card ai-reply">
            <div className="consequence__card-label">💬 Mentor Response</div>
            <p className="defend-user-text">You said: <em>"{defendText}"</em></p>
            {aiReply ? (
              <p className="ai-reply-text">{aiReply}</p>
            ) : (
              <p className="ai-reply-text muted">
                {LLM_READY ? "Couldn't reach mentor. Keep your reasoning in mind." : "Add VITE_GROQ_API_KEY (or Anthropic key) in .env for personalised feedback."}
              </p>
            )}
          </div>
        )}

        {/* Next */}
        <div className="consequence__actions">
          <button
            type="button"
            className="btn btn-next"
            onClick={onNext}
          >
            Next →
          </button>
        </div>

      </div>
    </div>
  );
}
