import React, { useState, useEffect, useCallback } from 'react';
import './index.css';

import { CHAPTERS, SCENARIOS } from './gameData';
import { saveGame, loadGame, clearGame } from './hooks/usePersistence';
import { getLevel, INITIAL_DNA, updateDNA, computeTitles } from './hooks/useProgression';

import ScoreBar          from './components/ScoreBar';
import SplashScreen      from './components/SplashScreen';
import ChapterIntro      from './components/ChapterIntro';
import ScenarioScreen    from './components/ScenarioScreen';
import ConsequenceScreen from './components/ConsequenceScreen';
import ChapterSummary    from './components/ChapterSummary';
import FinalScreen       from './components/FinalScreen';

const INITIAL_SCORE   = 100;
const TOTAL_CHAPTERS  = CHAPTERS.length;
const TOTAL_SCENARIOS = SCENARIOS.length;
const MAX_SCORE       = INITIAL_SCORE + TOTAL_SCENARIOS * 15;

const createChapterScoreMap = () =>
  CHAPTERS.reduce((acc, ch) => { acc[ch.id] = 0; return acc; }, {});

const SCREEN = {
  SPLASH:          'SPLASH',
  REFRESH_GUARD:   'REFRESH_GUARD',
  CHAPTER_INTRO:   'CHAPTER_INTRO',
  SCENARIO:        'SCENARIO',
  CONSEQUENCE:     'CONSEQUENCE',
  CHAPTER_SUMMARY: 'CHAPTER_SUMMARY',
  FINAL:           'FINAL',
};

const getInitialState = () => ({
  screen:         SCREEN.SPLASH,
  score:          INITIAL_SCORE,
  chapter:        CHAPTERS[0]?.id || 1,
  scenarioIndex:  0,
  lastDelta:      null,
  showDelta:      false,
  selectedChoice: null,
  principles:     [],
  chapterScores:  createChapterScoreMap(),
  choices:        [],
  dna:            { ...INITIAL_DNA },
  titles:         [],
  level:          'Junior Designer',
  activeUITask:   null,          // BUG FIX: was missing
  started:        false,
});

export default function App() {
  const [state, setState] = useState(getInitialState);
  const [savedGame, setSavedGame] = useState(() => loadGame());
  const hasCompletedSave = Boolean(
    savedGame && (
      savedGame.completed ||
      savedGame.screen === SCREEN.FINAL ||
      (savedGame.choices?.length || 0) >= TOTAL_SCENARIOS
    ),
  );

  useEffect(() => {
    if (state.started && state.screen !== SCREEN.SPLASH && state.screen !== SCREEN.REFRESH_GUARD) {
      saveGame(state);
    }
  }, [state]);

  // Refresh guard
  useEffect(() => {
    const onBeforeUnload = () => {
      if (state.started && state.screen !== SCREEN.SPLASH && state.screen !== SCREEN.FINAL) {
        saveGame(state);
      }
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [state]);

  const clampScore = (s) => Math.min(Math.max(s, 0), MAX_SCORE);

  const currentChapterScenarios = SCENARIOS.filter(s => s.chapter === state.chapter);
  const currentScenario         = currentChapterScenarios[state.scenarioIndex] || null;
  const currentChapterTotal     = currentChapterScenarios.length;
  const completedBefore         = SCENARIOS.filter(s => s.chapter < state.chapter).length;
  const globalScenarioNumber    = completedBefore + state.scenarioIndex + 1;

  const handleStart = useCallback(() => {
    clearGame();
    setSavedGame(null);
    setState({ ...getInitialState(), screen: SCREEN.CHAPTER_INTRO, started: true });
  }, []);

  const handleResume = useCallback(() => {
    if (!savedGame) return;
    setState({
      ...getInitialState(),
      ...savedGame,
      activeUITask: savedGame.activeUITask || null,
      screen:  SCREEN.SCENARIO,
      started: true,
    });
    setSavedGame(null);
  }, [savedGame]);

  const handleViewFinalReport = useCallback(() => {
    if (!savedGame) return;
    setState({
      ...getInitialState(),
      ...savedGame,
      activeUITask: null,
      screen: SCREEN.FINAL,
      started: true,
    });
    setSavedGame(null);
  }, [savedGame]);

  const handleChapterIntroContinue = useCallback(() => {
    setState(prev => ({ ...prev, screen: SCREEN.SCENARIO }));
  }, []);

  const handleChoiceSelected = useCallback((choiceId, uiTaskOverride) => {
    const scenario = currentScenario;
    if (!scenario) return;

    let delta, consequence;
    if (uiTaskOverride) {
      const deltasMap = { A: 15, B: 5, C: -10 };
      delta       = deltasMap[choiceId] ?? 5;
      consequence = uiTaskOverride.consequences[choiceId];
    } else {
      const choice = scenario.choices.find(c => c.id === choiceId);
      if (!choice) return;
      delta       = choice.delta;
      consequence = scenario.consequences[choiceId];
    }

    if (!consequence) return;

    const newScore      = clampScore(state.score + delta);
    const newDNA        = updateDNA(state.dna, scenario.id, choiceId);
    const newLevel      = getLevel(newScore).name;
    const newPrinciples = [
      ...state.principles,
      { principle: consequence.principle, lesson: consequence.lesson },
    ];
    const newTitles = computeTitles(newDNA, newPrinciples);

    setState(prev => ({
      ...prev,
      screen:         SCREEN.CONSEQUENCE,
      score:          newScore,
      lastDelta:      delta,
      showDelta:      true,
      selectedChoice: choiceId,
      chapterScores: {
        ...prev.chapterScores,
        [prev.chapter]: (prev.chapterScores[prev.chapter] || 0) + Math.max(0, delta),
      },
      principles:   newPrinciples,
      choices:      [...prev.choices, { scenarioId: scenario.id, choiceId }],
      dna:          newDNA,
      level:        newLevel,
      titles:       newTitles,
      activeUITask: uiTaskOverride || null,
    }));

    setTimeout(() => setState(prev => ({ ...prev, showDelta: false })), 3000);
  }, [currentScenario, state]);

  const handleConsequenceNext = useCallback(() => {
    const nextIndex = state.scenarioIndex + 1;
    if (nextIndex >= currentChapterTotal) {
      setState(prev => ({
        ...prev,
        screen:        SCREEN.CHAPTER_SUMMARY,
        scenarioIndex: nextIndex,
        activeUITask:  null,
      }));
    } else {
      setState(prev => ({
        ...prev,
        screen:         SCREEN.SCENARIO,
        scenarioIndex:  nextIndex,
        lastDelta:      null,
        selectedChoice: null,
        activeUITask:   null,
      }));
    }
  }, [currentChapterTotal, state.scenarioIndex]);

  const handleChapterSummaryContinue = useCallback(() => {
    if (state.chapter < TOTAL_CHAPTERS) {
      setState(prev => ({
        ...prev,
        chapter:        prev.chapter + 1,
        scenarioIndex:  0,
        screen:         SCREEN.CHAPTER_INTRO,
        selectedChoice: null,
        lastDelta:      null,
        activeUITask:   null,
      }));
    } else {
      setState(prev => ({ ...prev, screen: SCREEN.FINAL }));
    }
  }, [state.chapter]);

  const handlePlayAgain = useCallback(() => {
    clearGame();
    setSavedGame(null);
    setState(getInitialState());
  }, []);

  const showScoreBar = state.screen !== SCREEN.SPLASH && state.screen !== SCREEN.REFRESH_GUARD;

  // Determine the effective consequence for ConsequenceScreen
  const effectiveConsequence = state.activeUITask
    ? state.activeUITask.consequences?.[state.selectedChoice]
    : currentScenario?.consequences?.[state.selectedChoice];

  return (
    <>
      {showScoreBar && (
        <ScoreBar
          score={state.score}
          maxScore={MAX_SCORE}
          delta={state.lastDelta}
          showDelta={state.showDelta}
        />
      )}

      {state.screen === SCREEN.SPLASH && (
        <SplashScreen
          onStart={handleStart}
          onResume={handleResume}
          onViewFinalReport={handleViewFinalReport}
          canViewFinalReport={hasCompletedSave}
          savedGame={savedGame}
          chapterCount={TOTAL_CHAPTERS}
          scenarioCount={TOTAL_SCENARIOS}
          principleCount={TOTAL_SCENARIOS}
          maxRep={MAX_SCORE}
        />
      )}

      {state.screen === SCREEN.REFRESH_GUARD && (
        <div className="refresh-screen">
          <div className="refresh-screen__icon" aria-hidden="true">🔄</div>
          <h1 className="refresh-screen__title">Page was refreshed</h1>
          <p className="refresh-screen__desc">Your progress was saved. Resume right where you left off.</p>
          <button className="btn btn-primary" onClick={handleResume}>Resume Game →</button>
          <button className="btn btn-ghost" onClick={handlePlayAgain} style={{ marginTop: 12 }}>Start Over</button>
        </div>
      )}

      {state.screen === SCREEN.CHAPTER_INTRO && (
        <ChapterIntro
          key={`ci-${state.chapter}`}
          chapter={CHAPTERS.find(c => c.id === state.chapter)}
          totalChapters={TOTAL_CHAPTERS}
          onContinue={handleChapterIntroContinue}
        />
      )}

      {state.screen === SCREEN.SCENARIO && currentScenario && (
        <ScenarioScreen
          key={`sc-${state.chapter}-${state.scenarioIndex}`}
          scenario={currentScenario}
          scenarioIndex={state.scenarioIndex}
          chapterScenarioCount={currentChapterTotal}
          chapterNum={state.chapter}
          globalScenarioNumber={globalScenarioNumber}
          totalScenarios={TOTAL_SCENARIOS}
          onChoose={handleChoiceSelected}
        />
      )}

      {state.screen === SCREEN.CONSEQUENCE && effectiveConsequence && (
        <ConsequenceScreen
          key={`con-${state.chapter}-${state.scenarioIndex}-${state.selectedChoice}`}
          scenario={currentScenario}
          consequence={effectiveConsequence}
          choiceId={state.selectedChoice}
          delta={state.lastDelta}
          onNext={handleConsequenceNext}
          uiTask={state.activeUITask}
        />
      )}

      {state.screen === SCREEN.CHAPTER_SUMMARY && (
        <ChapterSummary
          key={`cs-${state.chapter}`}
          chapterNum={state.chapter}
          chapterTitle={CHAPTERS.find(c => c.id === state.chapter)?.title}
          totalScore={state.score}
          maxScore={MAX_SCORE}
          chapterScore={state.chapterScores[state.chapter] || 0}
          chapterScenarioCount={currentChapterTotal}
          totalChapters={TOTAL_CHAPTERS}
          dna={state.dna}
          titles={state.titles}
          onContinue={handleChapterSummaryContinue}
        />
      )}

      {state.screen === SCREEN.FINAL && (
        <FinalScreen
          totalScore={state.score}
          maxScore={MAX_SCORE}
          principles={state.principles}
          totalScenarios={TOTAL_SCENARIOS}
          dna={state.dna}
          titles={state.titles}
          choices={state.choices}
          scenarios={SCENARIOS}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </>
  );
}
