import React, { useState, useMemo } from 'react';
import { getEnding } from '../gameData';
import { DNA_TRAITS, getDNALabel } from '../hooks/useProgression';
import { createMessage, hasLlmKey } from '../lib/llm';

const LLM_READY = hasLlmKey();

const DNA_COLORS = {
  riskTolerance: '#F59E0B',
  stakeholderStyle: '#7C3AED',
  researchLean: '#10B981',
  userEmpathy: '#00D4FF',
};

export default function FinalScreen({
  totalScore, maxScore, principles, totalScenarios,
  dna, titles, choices, scenarios, onPlayAgain,
}) {
  const toContextSnippet = (text = '') => {
    const normalized = text.replace(/\s+/g, ' ').trim();
    if (!normalized) return '';
    const max = 170;
    return normalized.length > max ? `${normalized.slice(0, max)}...` : normalized;
  };

  const clamped = Math.min(Math.max(totalScore, 0), maxScore);
  const ending  = getEnding(clamped);
  const pct     = Math.round((clamped / maxScore) * 100);

  const [tab, setTab]                     = useState('dna');
  const [caseStudy, setCaseStudy]         = useState('');
  const [caseLoading, setCaseLoading]     = useState(false);
  const [caseGenerated, setCaseGenerated] = useState(false);
  // Choices where a higher-delta option existed (heuristic for "optimal" call)
  const missedItems = useMemo(() => {
    if (!choices?.length || !scenarios?.length) return [];
    return choices
      .filter(c => {
        const sc = scenarios.find(s => s.id === c.scenarioId);
        if (!sc?.choices) return false;
        const chosen = sc.choices.find(ch => ch.id === c.choiceId);
        const best   = sc.choices.reduce((a, b) => b.delta > a.delta ? b : a);
        return chosen && best && chosen.id !== best.id;
      })
      .slice(0, 5)
      .map(c => {
        const sc   = scenarios.find(s => s.id === c.scenarioId);
        const best = sc.choices.reduce((a, b) => b.delta > a.delta ? b : a);
        return {
          title:     sc.title,
          context:   toContextSnippet(sc.narration),
          youChose:  sc.choices.find(ch => ch.id === c.choiceId)?.text,
          bestWas:   best.text,
          principle: sc.consequences[best.id]?.principle,
          lesson:    sc.consequences[best.id]?.lesson,
        };
      });
  }, [choices, scenarios]);

  const generateCaseStudy = async () => {
    if (caseGenerated || caseLoading || !LLM_READY) return;
    setCaseLoading(true);

    // Summarise DNA for prompt
    const dnaSummary = Object.entries(DNA_TRAITS).map(([key, config]) => {
      const val = dna?.[key] ?? 50;
      return `${config.label}: ${getDNALabel(key, val)} (${val}/100)`;
    }).join(', ');

    const topPrinciples = principles.slice(0, 8).map(p => p.principle).join(', ');

    const prompt = `You are writing a professional UX design portfolio case study for a junior designer who just completed Casework — a game where players make real product design decisions for a startup called Launchly.

Their results:
- Final Score: ${clamped}/${maxScore} (${pct}%)
- Level Achieved: ${ending.title}
- Designer DNA: ${dnaSummary}
- Earned Titles: ${titles?.join(', ') || 'None yet'}
- Key principles encountered: ${topPrinciples}

Write a 3-paragraph portfolio case study in first person as if the designer is writing it for LinkedIn or their portfolio. 

Paragraph 1: What Casework is and what challenge the player tackled (2-3 sentences)
Paragraph 2: Key decisions made and design thinking demonstrated based on their DNA profile (3-4 sentences — be specific to their DNA scores, not generic)
Paragraph 3: What they learned and how this shapes their design approach going forward (2-3 sentences)

Write in a professional but human tone. No bullet points. No headers. Just three clean paragraphs. Max 200 words total.`;

    try {
      const text = await createMessage(prompt, 400);
      setCaseStudy(text);
    } catch (err) {
      setCaseStudy(
        err?.message
          ? `Could not generate case study: ${err.message}`
          : 'Could not generate case study. Try again later.',
      );
    } finally {
      setCaseLoading(false);
      setCaseGenerated(true);
    }
  };

  const handleShare = () => {
    const dnaParts = Object.entries(DNA_TRAITS).map(([key, config]) => {
      return `${config.label}: ${getDNALabel(key, dna?.[key] ?? 50)}`;
    }).join(' | ');
    const text = `I just completed Casework and earned "${ending.title}" with ${clamped}/${maxScore} Design Rep!\n\nMy Designer DNA: ${dnaParts}\n\nTitles earned: ${titles?.join(', ') || 'None'}\n\n#Casework #UXDesign #ProductDesign`;
    if (navigator.share) {
      navigator.share({ title: 'My Casework Results', text }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(text).then(() => alert('Copied to clipboard!')).catch(() => {});
    }
  };

  const handleCopyCaseStudy = () => {
    if (caseStudy) {
      navigator.clipboard?.writeText(caseStudy).then(() => alert('Case study copied!')).catch(() => {});
    }
  };

  return (
    <div className="final-screen">
      <div className="final-screen__inner">

        {/* Header */}
        <div className="final-screen__header">
          <div className="final-screen__eyebrow">Game Complete</div>
          <h1 className="final-screen__title" style={{ color: ending.color }}>{ending.title}</h1>
          <p className="final-screen__subtitle">"{ending.subtitle}"</p>
        </div>

        {/* Score */}
        <div className="final-screen__score-block">
          <div className="final-score__num" style={{ color: ending.color }}>{clamped}</div>
          <div className="final-score__meta">
            <div className="final-score__label">Design Rep</div>
            <div className="final-score__of">out of {maxScore}</div>
            <div className="final-score__pct">{pct}% of maximum</div>
          </div>
        </div>
        <div className="final-screen__bar-wrap">
          <div className="final-screen__bar-fill" style={{ width: `${pct}%`, background: ending.color }} />
        </div>

        {/* Story */}
        <div className="final-screen__story">
          <p>{ending.description}</p>
        </div>

        {/* Tabs */}
        <div className="final-tabs" role="tablist">
          {['dna', 'missed', 'principles', 'portfolio'].map(t => (
            <button
              key={t}
              className={`final-tab ${tab === t ? 'active' : ''}`}
              onClick={() => { setTab(t); if (t === 'portfolio') generateCaseStudy(); }}
              role="tab"
              aria-selected={tab === t}
            >
              {t === 'dna' ? 'DNA Report' : t === 'missed' ? 'What You Missed' : t === 'principles' ? 'Principles' : 'Portfolio'}
            </button>
          ))}
        </div>

        {/* DNA Report */}
        {tab === 'dna' && (
          <div className="final-panel">
            <div className="final-dna__grid">
              {Object.entries(DNA_TRAITS).map(([key, config]) => {
                const val   = dna?.[key] ?? 50;
                const label = getDNALabel(key, val);
                const color = DNA_COLORS[key];
                return (
                  <div key={key} className="dna-card">
                    <div className="dna-card__trait">{config.label}</div>
                    <div className="dna-card__value" style={{ color }}>{label}</div>
                    <div className="dna-card__bar-wrap">
                      <div className="dna-card__bar" style={{ width: `${val}%`, background: color }} />
                    </div>
                    <div className="dna-card__score">{val}/100</div>
                  </div>
                );
              })}
            </div>
            {titles && titles.length > 0 && (
              <div className="final-titles" style={{ marginTop: 20 }}>
                <div className="final-titles__label">Earned Titles</div>
                <div className="final-titles__row">
                  {titles.map(t => <span key={t} className="title-tag">{t}</span>)}
                </div>
              </div>
            )}
          </div>
        )}

        {/* What You Missed */}
        {tab === 'missed' && (
          <div className="final-panel">
            {missedItems.length === 0 ? (
              <div className="missed-empty">
                <div style={{ fontSize: 32 }}>🎯</div>
                <p>You made the optimal call on every tracked scenario. Impressive.</p>
              </div>
            ) : (
              <>
                <p className="missed-intro">These scenarios had a better call available. Here's what you could have done differently:</p>
                <div className="missed-list">
                  {missedItems.map((item, i) => (
                    <div key={i} className="missed-item">
                      <div className="missed-item__title">{item.title}</div>
                      <p className="missed-item__context">
                        <span className="missed-item__context-label">Scenario context:</span> {item.context}
                      </p>
                      <div className="missed-item__row">
                        <div className="missed-item__col">
                          <div className="missed-item__col-label">You chose</div>
                          <div className="missed-item__col-text your-choice">{item.youChose}</div>
                        </div>
                        <div className="missed-item__arrow">→</div>
                        <div className="missed-item__col">
                          <div className="missed-item__col-label">Best call</div>
                          <div className="missed-item__col-text best-choice">{item.bestWas}</div>
                        </div>
                      </div>
                      {item.principle && (
                        <div className="missed-item__principle">
                          💡 {item.principle} — {item.lesson}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Principles */}
        {tab === 'principles' && (
          <div className="final-panel">
            <p className="panel-count">{principles.length} design principles encountered across {totalScenarios} scenarios.</p>
            <div className="lessons-list">
              {principles.map((item, idx) => (
                <div key={idx} className="lesson-item">
                  <div className="lesson-item__number">{String(idx + 1).padStart(2, '0')}</div>
                  <div className="lesson-item__content">
                    <div className="lesson-item__principle">{item.principle}</div>
                    <div className="lesson-item__lesson">{item.lesson}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Portfolio Case Study */}
        {tab === 'portfolio' && (
          <div className="final-panel">
            <p className="panel-intro">Generate a portfolio-ready case study based on your decisions and DNA profile. Paste it on LinkedIn or your portfolio site.</p>
            {!LLM_READY ? (
              <div className="portfolio-no-key">
                <p>Add <code>VITE_GROQ_API_KEY</code> (recommended) or <code>VITE_ANTHROPIC_API_KEY</code> to your <code>.env</code> file to generate your personalised case study.</p>
              </div>
            ) : !caseGenerated && !caseLoading ? (
              <button className="btn btn-primary" onClick={generateCaseStudy}>
                Generate My Case Study →
              </button>
            ) : caseLoading ? (
              <div className="critic-loading" style={{ marginTop: 20 }}>
                <span className="critic-dot" /><span className="critic-dot" /><span className="critic-dot" />
                <span className="critic-loading-text">Writing your case study…</span>
              </div>
            ) : (
              <div className="case-study-block">
                <div className="case-study-text">{caseStudy}</div>
                <div className="case-study-actions">
                  <button className="btn btn-defend" onClick={handleCopyCaseStudy}>Copy Text</button>
                  <button className="btn btn-ghost" onClick={() => { setCaseGenerated(false); setCaseStudy(''); }}>Regenerate</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="final-screen__actions">
          <button className="btn btn-primary" onClick={onPlayAgain}>Play Again</button>
          <button className="btn btn-ghost" onClick={handleShare}>Share DNA Report ↗</button>
        </div>

      </div>
    </div>
  );
}
