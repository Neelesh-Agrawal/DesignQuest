// ─── LEVELS ──────────────────────────────────────────────────────────────────
export const LEVELS = [
  { name: 'Junior Designer', minScore: 0,   color: '#F59E0B' },
  { name: 'Mid Designer',    minScore: 120, color: '#7C3AED' },
  { name: 'Senior Designer', minScore: 220, color: '#00D4FF' },
  { name: 'Lead Designer',   minScore: 320, color: '#10B981' },
];

export function getLevel(score) {
  let current = LEVELS[0];
  for (const lvl of LEVELS) { if (score >= lvl.minScore) current = lvl; }
  return current;
}

export function getNextLevel(score) {
  for (const lvl of LEVELS) { if (score < lvl.minScore) return lvl; }
  return null;
}

// ─── DNA TRAITS ──────────────────────────────────────────────────────────────
export const DNA_TRAITS = {
  riskTolerance:    { label: 'Risk Tolerance',    low: 'Conservative',  mid: 'Balanced',   high: 'Bold'         },
  stakeholderStyle: { label: 'Stakeholder Style', low: 'Compliant',     mid: 'Diplomatic', high: 'Assertive'    },
  researchLean:     { label: 'Research Lean',     low: 'Intuition-Led', mid: 'Balanced',   high: 'Data-Driven'  },
  userEmpathy:      { label: 'User Empathy',      low: 'Business-First',mid: 'Balanced',   high: 'User-First'   },
};

export const INITIAL_DNA = { riskTolerance: 50, stakeholderStyle: 50, researchLean: 50, userEmpathy: 50 };

// ─── DNA ADJUSTMENTS — all 40 scenarios × 3 choices ─────────────────────────
const DNA_ADJ = {
  // Ch1
  '1_A': { stakeholderStyle: -15, riskTolerance: -10 },
  '1_B': { stakeholderStyle: +15, researchLean: +15, userEmpathy: +10 },
  '1_C': { stakeholderStyle: -5,  researchLean: -10 },
  '2_A': { userEmpathy: -15, stakeholderStyle: -10 },
  '2_B': { userEmpathy: +15, stakeholderStyle: +10, riskTolerance: +5 },
  '2_C': { riskTolerance: +5, stakeholderStyle: -5 },
  '3_A': { riskTolerance: -5 },
  '3_B': { researchLean: +10, userEmpathy: +10 },
  '3_C': { riskTolerance: +10, userEmpathy: -10 },
  '4_A': { stakeholderStyle: -15, userEmpathy: -15 },
  '4_B': { userEmpathy: +15, stakeholderStyle: +10 },
  '4_C': { researchLean: +5, riskTolerance: -10 },
  '5_A': { researchLean: -5, userEmpathy: -5 },
  '5_B': { userEmpathy: +15, researchLean: +10 },
  '5_C': { riskTolerance: +5, userEmpathy: -10 },
  '6_A': { userEmpathy: -15, riskTolerance: -10 },
  '6_B': { userEmpathy: +15, researchLean: +10 },
  '6_C': { riskTolerance: +15, researchLean: -10 },
  '7_A': { stakeholderStyle: -15 },
  '7_B': { stakeholderStyle: +15, riskTolerance: +5 },
  '7_C': { riskTolerance: -5, stakeholderStyle: -10 },
  // Ch2
  '8_A':  { userEmpathy: -15, riskTolerance: -10 },
  '8_B':  { userEmpathy: +15, riskTolerance: +5 },
  '8_C':  { riskTolerance: +5, userEmpathy: -5 },
  '9_A':  { researchLean: -10, riskTolerance: +5 },
  '9_B':  { researchLean: +15, riskTolerance: -5 },
  '9_C':  { researchLean: +10, riskTolerance: +10 },
  '10_A': { stakeholderStyle: -15, researchLean: -5 },
  '10_B': { stakeholderStyle: +15, researchLean: +10 },
  '10_C': { researchLean: -5, stakeholderStyle: -5 },
  '11_A': { userEmpathy: -15 },
  '11_B': { userEmpathy: +15, researchLean: +10 },
  '11_C': { userEmpathy: +5 },
  '12_A': { userEmpathy: -15, riskTolerance: -10 },
  '12_B': { userEmpathy: +15, riskTolerance: +5 },
  '12_C': { userEmpathy: +5, riskTolerance: +5 },
  '13_A': { userEmpathy: -15, stakeholderStyle: -5 },
  '13_B': { userEmpathy: +15, riskTolerance: +10 },
  '13_C': { userEmpathy: +5 },
  '14_A': { stakeholderStyle: -10, userEmpathy: -10 },
  '14_B': { userEmpathy: +15, stakeholderStyle: +10 },
  '14_C': { riskTolerance: +10, stakeholderStyle: -15 },
  // Ch3
  '15_A': { userEmpathy: -15, riskTolerance: -5 },
  '15_B': { userEmpathy: +15, researchLean: +10 },
  '15_C': { researchLean: -5 },
  '16_A': { userEmpathy: -15, riskTolerance: -10 },
  '16_B': { userEmpathy: +15, riskTolerance: +5 },
  '16_C': { userEmpathy: +5, riskTolerance: +5 },
  '17_A': { userEmpathy: -15, stakeholderStyle: -5 },
  '17_B': { userEmpathy: +15, riskTolerance: +10 },
  '17_C': { userEmpathy: +5 },
  '18_A': { stakeholderStyle: -10, userEmpathy: -10 },
  '18_B': { userEmpathy: +15, stakeholderStyle: +10 },
  '18_C': { riskTolerance: +5, stakeholderStyle: -15 },
  '19_A': { stakeholderStyle: -15, userEmpathy: -10 },
  '19_B': { userEmpathy: +15, stakeholderStyle: +10 },
  '19_C': { stakeholderStyle: +5, riskTolerance: +5 },
  '20_A': { userEmpathy: -15, riskTolerance: -5 },
  '20_B': { userEmpathy: +15, researchLean: +5 },
  '20_C': { researchLean: -5, userEmpathy: -5 },
  // Ch4 – Visual Thinking
  '21_A': { userEmpathy: -10, riskTolerance: -5 },
  '21_B': { userEmpathy: +15, researchLean: +5 },
  '21_C': { riskTolerance: +5, userEmpathy: -5 },
  '22_A': { stakeholderStyle: -5, userEmpathy: -5 },
  '22_B': { userEmpathy: +10, researchLean: +10 },
  '22_C': { userEmpathy: -10, riskTolerance: +5 },
  '23_A': { userEmpathy: -5, riskTolerance: -5 },
  '23_B': { userEmpathy: +15, stakeholderStyle: +5 },
  '23_C': { riskTolerance: +10, userEmpathy: -10 },
  '24_A': { stakeholderStyle: -10, userEmpathy: -10 },
  '24_B': { userEmpathy: +15, riskTolerance: +5 },
  '24_C': { researchLean: +5, userEmpathy: +5 },
  '25_A': { riskTolerance: -10, userEmpathy: -5 },
  '25_B': { riskTolerance: +15, userEmpathy: +5 },
  '25_C': { userEmpathy: -10 },
  // Ch5 – Psychology
  '26_A': { stakeholderStyle: -10, riskTolerance: -5 },
  '26_B': { userEmpathy: +15, riskTolerance: +5 },
  '26_C': { userEmpathy: +10, riskTolerance: +5 },
  '27_A': { stakeholderStyle: -15, userEmpathy: -10 },
  '27_B': { userEmpathy: +10, researchLean: +10 },
  '27_C': { riskTolerance: -10, stakeholderStyle: -5 },
  '28_A': { stakeholderStyle: -15, userEmpathy: -10 },
  '28_B': { userEmpathy: +15, riskTolerance: +5 },
  '28_C': { researchLean: +10, riskTolerance: +5 },
  '29_A': { riskTolerance: -10, userEmpathy: -10 },
  '29_B': { userEmpathy: +15, researchLean: +10 },
  '29_C': { researchLean: +5, userEmpathy: +5 },
  '30_A': { userEmpathy: -10, stakeholderStyle: -5 },
  '30_B': { researchLean: +15, riskTolerance: +5 },
  '30_C': { userEmpathy: -15, riskTolerance: -5 },
  // Ch6 – Visual Design Craft
  '31_A': { stakeholderStyle: -10, userEmpathy: -5 },
  '31_B': { userEmpathy: +10, stakeholderStyle: +10 },
  '31_C': { riskTolerance: +5, stakeholderStyle: -5 },
  '32_A': { riskTolerance: -10, userEmpathy: -10 },
  '32_B': { userEmpathy: +15, riskTolerance: +5 },
  '32_C': { researchLean: +5 },
  '33_A': { riskTolerance: -10, userEmpathy: -5 },
  '33_B': { userEmpathy: +15, stakeholderStyle: +5 },
  '33_C': { researchLean: +10, riskTolerance: +5 },
  '34_A': { riskTolerance: -5, userEmpathy: -10 },
  '34_B': { userEmpathy: +10, stakeholderStyle: +5 },
  '34_C': { userEmpathy: +5, riskTolerance: +5 },
  '35_A': { stakeholderStyle: -10, userEmpathy: -10 },
  '35_B': { userEmpathy: +15, researchLean: +5 },
  '35_C': { researchLean: +10 },
  // Ch7 – Research & Mental Models
  '36_A': { riskTolerance: -10, researchLean: -10 },
  '36_B': { researchLean: +15, userEmpathy: +10 },
  '36_C': { researchLean: +10, riskTolerance: +5 },
  '37_A': { researchLean: -15, userEmpathy: -5 },
  '37_B': { researchLean: +15, userEmpathy: +5 },
  '37_C': { researchLean: +5, userEmpathy: +5 },
  '38_A': { userEmpathy: +5, researchLean: +5 },
  '38_B': { userEmpathy: +15, researchLean: +10 },
  '38_C': { userEmpathy: -10, stakeholderStyle: -5 },
  '39_A': { researchLean: -10, userEmpathy: -5 },
  '39_B': { researchLean: +15, userEmpathy: +10 },
  '39_C': { researchLean: +5, userEmpathy: +5 },
  '40_A': { userEmpathy: -10, researchLean: -5 },
  '40_B': { userEmpathy: +10, researchLean: +15 },
  '40_C': { riskTolerance: +5, researchLean: +5 },
  // Ch8 – Systems & Scale
  '41_A': { stakeholderStyle: -10, riskTolerance: -5 },
  '41_B': { stakeholderStyle: +15, researchLean: +10 },
  '41_C': { researchLean: +5, riskTolerance: +5 },
  '42_A': { riskTolerance: -10, stakeholderStyle: -5 },
  '42_B': { riskTolerance: +10, stakeholderStyle: +10 },
  '42_C': { researchLean: +5, riskTolerance: +5 },
  '43_A': { stakeholderStyle: +5, riskTolerance: +5 },
  '43_B': { userEmpathy: +10, stakeholderStyle: +10 },
  '43_C': { userEmpathy: -10, stakeholderStyle: -5 },
  '44_A': { stakeholderStyle: -10, riskTolerance: -5 },
  '44_B': { researchLean: +15, stakeholderStyle: +5 },
  '44_C': { riskTolerance: +5, researchLean: +5 },
  '45_A': { riskTolerance: -10, stakeholderStyle: -5 },
  '45_B': { stakeholderStyle: +15, userEmpathy: +10 },
  '45_C': { userEmpathy: -10, stakeholderStyle: -10 },
};

export function updateDNA(dna, scenarioId, choiceId) {
  const key = `${scenarioId}_${choiceId}`;
  const adj = DNA_ADJ[key] || {};
  const updated = { ...dna };
  for (const [trait, delta] of Object.entries(adj)) {
    updated[trait] = Math.min(100, Math.max(0, (updated[trait] || 50) + delta));
  }
  return updated;
}

export function getDNALabel(trait, value) {
  const config = DNA_TRAITS[trait];
  if (!config) return '';
  if (value >= 67) return config.high;
  if (value >= 34) return config.mid;
  return config.low;
}

// ─── TITLES ──────────────────────────────────────────────────────────────────
const ALL_TITLES = [
  { id: 'user_advocate',       label: 'User Advocate',          condition: (dna) => dna.userEmpathy >= 70 },
  { id: 'data_defender',       label: 'Data Defender',          condition: (dna) => dna.researchLean >= 70 },
  { id: 'assertive_designer',  label: 'Assertive Designer',     condition: (dna) => dna.stakeholderStyle >= 70 },
  { id: 'bold_thinker',        label: 'Bold Thinker',           condition: (dna) => dna.riskTolerance >= 70 },
  { id: 'accessibility_champ', label: 'Accessibility Champion', condition: (_, p) => p.some(x => /wcag|accessibility|keyboard/i.test(x.principle || '')) },
  { id: 'people_reader',       label: 'People Reader',          condition: (dna) => dna.userEmpathy >= 80 && dna.stakeholderStyle >= 60 },
  { id: 'systems_thinker',     label: 'Systems Thinker',        condition: (_, p) => p.filter(x => /system|design system|debt|token/i.test(x.principle || '')).length >= 2 },
  { id: 'research_champion',   label: 'Research Champion',      condition: (dna) => dna.researchLean >= 80 },
  { id: 'ethical_designer',    label: 'Ethical Designer',       condition: (_, p) => p.some(x => /dark pattern|nudge/i.test(x.principle || '')) },
];

export function computeTitles(dna, principles) {
  return ALL_TITLES.filter(t => t.condition(dna, principles)).map(t => t.label);
}
