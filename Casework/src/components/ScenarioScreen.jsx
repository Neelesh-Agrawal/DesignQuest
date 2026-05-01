import React, { useState, useEffect, useMemo } from 'react';
import UITask from './UITask';
import { UI_TASKS } from '../gameDataExtension';

function seededShuffle(list, seedValue) {
  const result = [...list];
  let seed = Number(seedValue) || 1;
  for (let i = result.length - 1; i > 0; i -= 1) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const j = seed % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

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

  const shuffledChoices = useMemo(() => {
    if (!scenario?.choices?.length) return [];
    // Stable order per scenario to avoid visual reshuffle on re-renders.
    return seededShuffle(scenario.choices, scenario.id);
  }, [scenario]);

  // Keyboard shortcuts for text scenarios only
  useEffect(() => {
    if (uiTask || disabled) return;
    const onKey = (e) => {
      if (disabled) return;
      const idx = Number(e.key) - 1;
      const target = shuffledChoices[idx];
      if (target?.id) {
        setDisabled(true);
        onChoose(target.id, null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [disabled, onChoose, uiTask, shuffledChoices]);

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
              {shuffledChoices.map((choice, idx) => (
                <button
                  key={choice.id}
                  className="choice-btn"
                  onClick={() => handleChoice(choice.id, null)}
                  disabled={disabled}
                  aria-label={`Option ${idx + 1}: ${choice.text}`}
                >
                  <span className="choice-btn__letter" aria-hidden="true">{idx + 1}</span>
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
