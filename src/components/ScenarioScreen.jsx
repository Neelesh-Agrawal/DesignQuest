import React, { useState, useEffect } from 'react';

/**
 * ScenarioScreen — shows scenario narration and 3 choice buttons.
 * Props:
 *   scenario     — scenario data object
 *   scenarioIndex — 1-based index within chapter
 *   chapterScenarioCount — total scenarios in chapter
 *   chapterNum   — current chapter number
 *   globalScenarioNumber — overall scenario index across game
 *   totalScenarios — total scenario count
 *   onChoose(choiceId) — called when a choice is selected
 */
export default function ScenarioScreen({
  scenario,
  scenarioIndex,
  chapterScenarioCount,
  chapterNum,
  globalScenarioNumber,
  totalScenarios,
  onChoose,
}) {
  const [disabled, setDisabled] = useState(false);

  const handleChoice = (choiceId) => {
    if (disabled) return;
    setDisabled(true);        // Edge case: prevent spam-click
    onChoose(choiceId);
  };

  useEffect(() => {
    const onKeyDown = (event) => {
      if (disabled) return;
      const keyMap = { '1': 'A', '2': 'B', '3': 'C' };
      const choiceId = keyMap[event.key];
      if (!choiceId) return;
      setDisabled(true);
      onChoose(choiceId);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [disabled, onChoose]);

  return (
    <div className="scenario">
      <div className="scenario__inner">
        {/* Header */}
        <div className="scenario__header">
          <span className="scenario__number" aria-label={`Scenario ${globalScenarioNumber} of ${totalScenarios}`}>
            Ch.{chapterNum} · Scenario {globalScenarioNumber} / {totalScenarios}
          </span>
          <span className="scenario__number" aria-label={`Scenario ${scenarioIndex} of ${chapterScenarioCount} in chapter ${chapterNum}`}>
            In Chapter: {scenarioIndex} / {chapterScenarioCount}
          </span>
          <span className="scenario__title">{scenario.title}</span>
        </div>

        {/* Narration card */}
        <div className="scenario__card" role="article" aria-label="Scenario narration">
          <p className="scenario__narration">{scenario.narration}</p>
        </div>

        {/* Choices */}
        <p className="scenario__choices-label">Choose your response</p>
        <p className="scenario__shortcut-hint">Tip: Press 1, 2, or 3 for faster play.</p>
        <div
          className="scenario__choices"
          role="group"
          aria-label={`Response options for: ${scenario.title}`}
        >
          {scenario.choices.map((choice) => (
            <button
              key={choice.id}
              id={`choice-${scenario.id}-${choice.id}`}
              className="choice-btn"
              onClick={() => handleChoice(choice.id)}
              disabled={disabled}
              aria-label={`Option ${choice.id}: ${choice.text}`}
            >
              <span className="choice-btn__letter" aria-hidden="true">{choice.id}</span>
              {choice.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
