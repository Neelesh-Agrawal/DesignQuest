const SAVE_KEY = 'designquest_save_v1';

export function saveGame(state) {
  try {
    const saveData = {
      score:         state.score,
      chapter:       state.chapter,
      scenarioIndex: state.scenarioIndex,
      screen:        state.screen,
      completed:     state.screen === 'FINAL',
      principles:    state.principles,
      chapterScores: state.chapterScores,
      choices:       state.choices || [],
      dna:           state.dna || {},
      titles:        state.titles || [],
      level:         state.level || 'Junior Designer',
      savedAt:       Date.now(),
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
  } catch {
    void 0;
  }
}

export function loadGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data.chapter || data.score === undefined) return null;
    return data;
  } catch {
    return null;
  }
}

export function clearGame() {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch {
    void 0;
  }
}
