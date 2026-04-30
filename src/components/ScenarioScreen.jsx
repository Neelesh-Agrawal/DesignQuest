import React, { useState, useEffect } from 'react';
import UITask from './UITask';
import { UI_TASKS } from '../gameDataExtension';

export default function ScenarioScreen({
  scenario,
  scenarioIndex,        // 0-based index within chapter
  chapterScenarioCount,
  chapterNum,
  globalScenarioNumber,
  totalScenarios,
  onChoose,
}) {
  const [disabled, setDisabled] = useState(false);

  // UI task slots: show at scenarioIndex 2 (3rd scenario, 0-based)
  // This keeps it mid-chapter, after users are warmed up
  const uitaskKey  = `uitask_ch${chapterNum}`;
  const uiTask     = UI_TASKS[uitaskKey] && scenarioIndex === 2 ? UI_TASKS[uitaskKey] : null;

  const handleChoice = (choiceId, taskOverride) => {
    if (disabled) return;
    setDisabled(true);
    onChoose(choiceId, taskOverride || null);
  };

  // Keyboard shortcuts for text scenarios only
  useEffect(() => {
    if (uiTask || disabled) return;
    const onKey = (e) => {
      if (disabled) return;
      const map = { '1': 'A', '2': 'B', '3': 'C' };
      if (map[e.key]) { setDisabled(true); onChoose(map[e.key], null); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [disabled, onChoose, uiTask]);

  const pct = Math.round((globalScenarioNumber / totalScenarios) * 100);

  return (
    <div className="scenario">
      <div className="scenario__inner">

        {/* Header */}
        <div className="scenario__header">
          <span className="scenario__number">
            Ch.{chapterNum} · Scenario {scenarioIndex + 1}/{chapterScenarioCount} · {globalScenarioNumber}/{totalScenarios} overall
          </span>
          <div className="scenario__progress-bar" aria-hidden="true">
            <div className="scenario__progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>

        <h2 className="scenario__title">
          {uiTask ? uiTask.title : scenario.title}
        </h2>

        {uiTask ? (
          <UITask
            task={uiTask}
            onComplete={(choiceId) => handleChoice(choiceId, uiTask)}
          />
        ) : (
          <>
            <div className="scenario__card">
              <p className="scenario__narration">{scenario.narration}</p>
            </div>
            <p className="scenario__choices-label">Choose your response</p>
            <p className="scenario__shortcut-hint">Tip: Press 1, 2, or 3 to choose quickly.</p>
            <div className="scenario__choices" role="group" aria-label="Response options">
              {scenario.choices.map((choice) => (
                <button
                  key={choice.id}
                  className="choice-btn"
                  onClick={() => handleChoice(choice.id, null)}
                  disabled={disabled}
                  aria-label={`Option ${choice.id}: ${choice.text}`}
                >
                  <span className="choice-btn__letter" aria-hidden="true">{choice.id}</span>
                  {choice.text}
                </button>
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  );
}
