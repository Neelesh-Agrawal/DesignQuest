import React, { useState, useEffect, useCallback } from 'react';
import './index.css';

import { CHAPTERS, SCENARIOS } from './gameData';

import ScoreBar       from './components/ScoreBar';
import SplashScreen   from './components/SplashScreen';
import ChapterIntro   from './components/ChapterIntro';
import ScenarioScreen from './components/ScenarioScreen';
import ConsequenceScreen from './components/ConsequenceScreen';
import ChapterSummary from './components/ChapterSummary';
import FinalScreen    from './components/FinalScreen';

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const INITIAL_SCORE = 100;
const TOTAL_CHAPTERS = CHAPTERS.length;
const TOTAL_SCENARIOS = SCENARIOS.length;
const MAX_SCORE = INITIAL_SCORE + TOTAL_SCENARIOS * 15;

const createChapterScoreMap = () =>
  CHAPTERS.reduce((acc, chapter) => {
    acc[chapter.id] = 0;
    return acc;
  }, {});

// ─── GAME SCREENS ─────────────────────────────────────────────────────────────
const SCREEN = {
  SPLASH:        'SPLASH',
  REFRESH_GUARD: 'REFRESH_GUARD',
  CHAPTER_INTRO: 'CHAPTER_INTRO',
  SCENARIO:      'SCENARIO',
  CONSEQUENCE:   'CONSEQUENCE',
  CHAPTER_SUMMARY: 'CHAPTER_SUMMARY',
  FINAL:         'FINAL',
};

// ─── INITIAL STATE ─────────────────────────────────────────────────────────────
const getInitialState = () => ({
  screen:          SCREEN.SPLASH,
  score:           INITIAL_SCORE,
  chapter:         CHAPTERS[0]?.id || 1,
  scenarioIndex:   0,             // 0–4 within chapter
  lastDelta:       null,          // last score change for bar animation
  showDelta:       false,
  selectedChoice:  null,
  principles:      [],            // { principle, lesson } collected
  chapterScores:   createChapterScoreMap(),
  started:         false,         // true once any game screen was shown (for refresh guard)
});

export default function App() {
  const [state, setState] = useState(getInitialState);

  // ─── REFRESH GUARD ─────────────────────────────────────────────────────────
  // If user refreshes while mid-game, show recovery screen
  useEffect(() => {
    const onLoad = () => {
      // If we detect a page reload while game was in progress, redirect to guard
      if (performance.navigation?.type === 1 || performance.getEntriesByType?.('navigation')[0]?.type === 'reload') {
        setState(prev => {
          if (prev.started && prev.screen !== SCREEN.SPLASH && prev.screen !== SCREEN.FINAL) {
            return { ...prev, screen: SCREEN.REFRESH_GUARD };
          }
          return prev;
        });
      }
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  // ─── HELPERS ───────────────────────────────────────────────────────────────
  const clampScore = (s) => Math.min(Math.max(s, 0), MAX_SCORE);

  const currentChapterScenarios = SCENARIOS.filter(s => s.chapter === state.chapter);
  const currentScenario = currentChapterScenarios[state.scenarioIndex] || null;
  const currentChapterTotalScenarios = currentChapterScenarios.length;
  const completedScenariosBeforeChapter = SCENARIOS.filter(s => s.chapter < state.chapter).length;
  const globalScenarioNumber = completedScenariosBeforeChapter + state.scenarioIndex + 1;

  // ─── ACTIONS ───────────────────────────────────────────────────────────────

  const handleStart = useCallback(() => {
    setState(prev => ({ ...prev, screen: SCREEN.CHAPTER_INTRO, started: true }));
  }, []);

  const handleChapterIntroContinue = useCallback(() => {
    setState(prev => ({ ...prev, screen: SCREEN.SCENARIO }));
  }, []);

  const handleChoiceSelected = useCallback((choiceId) => {
    const scenario = currentScenario;
    if (!scenario) return;

    const choice = scenario.choices.find(c => c.id === choiceId);
    if (!choice) return;

    const delta = choice.delta;
    const newScore = clampScore(state.score + delta);
    const consequence = scenario.consequences[choiceId];
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
      principles: [
        ...prev.principles,
        { principle: consequence.principle, lesson: consequence.lesson },
      ],
    }));

    // Hide delta after 3s
    setTimeout(() => {
      setState(prev => ({ ...prev, showDelta: false }));
    }, 3000);
  }, [currentScenario, state.score]);

  const handleConsequenceNext = useCallback(() => {
    const nextIndex = state.scenarioIndex + 1;
    const chapterScenarioCount = currentChapterScenarios.length;

    if (nextIndex >= chapterScenarioCount) {
      // End of chapter
      setState(prev => ({ ...prev, screen: SCREEN.CHAPTER_SUMMARY, scenarioIndex: nextIndex }));
    } else {
      setState(prev => ({
        ...prev,
        screen: SCREEN.SCENARIO,
        scenarioIndex: nextIndex,
        lastDelta: null,
        selectedChoice: null,
      }));
    }
  }, [currentChapterScenarios.length, state.scenarioIndex]);

  const handleChapterSummaryContinue = useCallback(() => {
    if (state.chapter < TOTAL_CHAPTERS) {
      setState(prev => ({
        ...prev,
        chapter: prev.chapter + 1,
        scenarioIndex: 0,
        screen: SCREEN.CHAPTER_INTRO,
        selectedChoice: null,
        lastDelta: null,
      }));
    } else {
      // Game over — final screen
      setState(prev => ({ ...prev, screen: SCREEN.FINAL }));
    }
  }, [state.chapter]);

  const handlePlayAgain = useCallback(() => {
    setState(getInitialState());
  }, []);

  // ─── RENDER ────────────────────────────────────────────────────────────────

  const showScoreBar = state.screen !== SCREEN.SPLASH && state.screen !== SCREEN.REFRESH_GUARD;

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
          chapterCount={TOTAL_CHAPTERS}
          scenarioCount={TOTAL_SCENARIOS}
          principleCount={TOTAL_SCENARIOS}
          maxRep={MAX_SCORE}
        />
      )}

      {state.screen === SCREEN.REFRESH_GUARD && (
        <div className="refresh-screen">
          <div className="refresh-screen__icon" aria-hidden="true">🔄</div>
          <h1 className="refresh-screen__title">Game Lost on Refresh</h1>
          <p className="refresh-screen__desc">
            DesignQuest doesn't save progress between page reloads. Ready to start a new run?
          </p>
          <button
            id="restart-btn"
            className="btn btn-primary"
            onClick={handlePlayAgain}
            aria-label="Start a new game"
          >
            Start Over →
          </button>
        </div>
      )}

      {state.screen === SCREEN.CHAPTER_INTRO && (
        <ChapterIntro
          key={`chapter-intro-${state.chapter}`}
          chapter={CHAPTERS.find(c => c.id === state.chapter)}
          totalChapters={TOTAL_CHAPTERS}
          onContinue={handleChapterIntroContinue}
        />
      )}

      {state.screen === SCREEN.SCENARIO && currentScenario && (
        <ScenarioScreen
          key={`scenario-${currentScenario.id}`}
          scenario={currentScenario}
          scenarioIndex={state.scenarioIndex + 1}
          chapterScenarioCount={currentChapterTotalScenarios}
          chapterNum={state.chapter}
          globalScenarioNumber={globalScenarioNumber}
          totalScenarios={TOTAL_SCENARIOS}
          onChoose={handleChoiceSelected}
        />
      )}

      {state.screen === SCREEN.CONSEQUENCE && currentScenario && state.selectedChoice && (
        <ConsequenceScreen
          key={`consequence-${currentScenario.id}-${state.selectedChoice}`}
          consequence={currentScenario.consequences[state.selectedChoice]}
          delta={state.lastDelta}
          onNext={handleConsequenceNext}
        />
      )}

      {state.screen === SCREEN.CHAPTER_SUMMARY && (
        <ChapterSummary
          key={`chapter-summary-${state.chapter}`}
          chapterNum={state.chapter}
          chapterTitle={CHAPTERS.find(c => c.id === state.chapter)?.title}
          totalScore={state.score}
          maxScore={MAX_SCORE}
          chapterScore={state.chapterScores[state.chapter] || 0}
          chapterScenarioCount={currentChapterTotalScenarios}
          totalChapters={TOTAL_CHAPTERS}
          onContinue={handleChapterSummaryContinue}
        />
      )}

      {state.screen === SCREEN.FINAL && (
        <FinalScreen
          totalScore={state.score}
          maxScore={MAX_SCORE}
          principles={state.principles}
          totalScenarios={TOTAL_SCENARIOS}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </>
  );
}
