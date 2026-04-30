import React, { useState } from 'react';

/**
 * UITask — interactive scenario that replaces standard A/B/C choice
 * Each task type teaches a law through doing, not reading.
 * Props: task { type, instruction, law, lawDetail, options }, onComplete(choiceId)
 */

// ── Fitts's Law Task ─────────────────────────────────────────────────────────
function FittsTask({ task, onComplete }) {
  const [selected, setSelected] = useState(null);
  const buttons = [
    { id: 'A', label: 'Tiny',   height: 24,  note: '24px — hard to hit',     delta: -10 },
    { id: 'B', label: 'Medium', height: 36,  note: '36px — borderline',       delta: 5  },
    { id: 'C', label: 'Large',  height: 48,  note: '48px — comfortable tap',  delta: 15 },
  ];

  const pick = (btn) => {
    if (selected) return;
    setSelected(btn.id);
    setTimeout(() => onComplete(btn.id), 800);
  };

  return (
    <div className="uitask__body">
      <p className="uitask__instruction">{task.instruction}</p>
      <div className="uitask__fitts-demo">
        {buttons.map(btn => (
          <div key={btn.id} className="uitask__fitts-row">
            <button
              className={`uitask__fitts-btn ${selected === btn.id ? 'selected' : ''} ${selected && selected !== btn.id ? 'dimmed' : ''}`}
              style={{ height: btn.height }}
              onClick={() => pick(btn)}
              disabled={!!selected}
              aria-label={`${btn.label} button — ${btn.note}`}
            >
              {btn.label}
            </button>
            <span className="uitask__fitts-note">{btn.note}</span>
          </div>
        ))}
      </div>
      {selected && (
        <div className="uitask__selection-confirm">
          You chose the {buttons.find(b => b.id === selected)?.label} button — getting feedback…
        </div>
      )}
    </div>
  );
}

// ── Proximity Task ───────────────────────────────────────────────────────────
function ProximityTask({ task, onComplete }) {
  const [selected, setSelected] = useState(null);
  const layouts = [
    { id: 'A', label: 'Scattered', delta: -10, desc: 'All elements spread evenly across the grid' },
    { id: 'B', label: 'Grouped',   delta: 15,  desc: 'Related elements clustered, groups separated by space' },
    { id: 'C', label: 'Boxed',     delta: 5,   desc: 'Each group inside a bordered box' },
  ];

  const pick = (opt) => {
    if (selected) return;
    setSelected(opt.id);
    setTimeout(() => onComplete(opt.id), 800);
  };

  const renderLayout = (id) => {
    if (id === 'A') return (
      <div className="prox-grid scattered">
        {['📊','📈','👤','📧','⚙️','🔔','📁','💬'].map((icon, i) => (
          <div key={i} className="prox-item">{icon}</div>
        ))}
      </div>
    );
    if (id === 'B') return (
      <div className="prox-grid grouped">
        <div className="prox-group"><div className="prox-item">📊</div><div className="prox-item">📈</div></div>
        <div className="prox-group"><div className="prox-item">👤</div><div className="prox-item">📧</div></div>
        <div className="prox-group"><div className="prox-item">⚙️</div><div className="prox-item">🔔</div></div>
        <div className="prox-group"><div className="prox-item">📁</div><div className="prox-item">💬</div></div>
      </div>
    );
    return (
      <div className="prox-grid boxed">
        <div className="prox-box"><div className="prox-item">📊</div><div className="prox-item">📈</div></div>
        <div className="prox-box"><div className="prox-item">👤</div><div className="prox-item">📧</div></div>
        <div className="prox-box"><div className="prox-item">⚙️</div><div className="prox-item">🔔</div></div>
        <div className="prox-box"><div className="prox-item">📁</div><div className="prox-item">💬</div></div>
      </div>
    );
  };

  return (
    <div className="uitask__body">
      <p className="uitask__instruction">{task.instruction}</p>
      <div className="uitask__layout-options">
        {layouts.map(opt => (
          <button
            key={opt.id}
            className={`uitask__layout-card ${selected === opt.id ? 'selected' : ''} ${selected && selected !== opt.id ? 'dimmed' : ''}`}
            onClick={() => pick(opt)}
            disabled={!!selected}
            aria-label={`${opt.label}: ${opt.desc}`}
          >
            {renderLayout(opt.id)}
            <div className="uitask__layout-label">{opt.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Contrast Task ────────────────────────────────────────────────────────────
function ContrastTask({ task, onComplete }) {
  const [selected, setSelected] = useState(null);
  const swatches = [
    { id: 'A', bg: '#E8F4E8', text: '#7DC47D', label: 'Fails AA', note: '2.1:1 ratio', delta: -10 },
    { id: 'B', bg: '#E8F4E8', text: '#2D7D2D', label: 'Passes AA', note: '5.8:1 ratio', delta: 15 },
    { id: 'C', bg: '#E8F4E8', text: '#1A1A1A', label: 'High contrast', note: '15:1 ratio', delta: 5 },
  ];

  const pick = (s) => {
    if (selected) return;
    setSelected(s.id);
    setTimeout(() => onComplete(s.id), 800);
  };

  return (
    <div className="uitask__body">
      <p className="uitask__instruction">{task.instruction}</p>
      <p className="uitask__sub">The background is fixed. Pick the text colour that passes WCAG AA.</p>
      <div className="uitask__contrast-row">
        {swatches.map(s => (
          <button
            key={s.id}
            className={`uitask__contrast-card ${selected === s.id ? 'selected' : ''} ${selected && selected !== s.id ? 'dimmed' : ''}`}
            style={{ background: s.bg }}
            onClick={() => pick(s)}
            disabled={!!selected}
            aria-label={`${s.label} — ${s.note}`}
          >
            <span className="uitask__contrast-sample" style={{ color: s.text }}>Aa</span>
            <span className="uitask__contrast-label" style={{ color: s.text }}>{s.note}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Priority Reorder Task ────────────────────────────────────────────────────
function ReorderTask({ task, onComplete }) {
  const defaultOrder = ['Low stock alert', 'Weekly digest', 'New comment', 'System update'];
  const [items, setItems] = useState(defaultOrder);
  const [dragging, setDragging] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const onDragStart = (i) => setDragging(i);
  const onDragOver  = (e, i) => {
    e.preventDefault();
    if (dragging === null || dragging === i) return;
    const next = [...items];
    const [moved] = next.splice(dragging, 1);
    next.splice(i, 0, moved);
    setItems(next);
    setDragging(i);
  };
  const onDragEnd = () => setDragging(null);

  const handleSubmit = () => {
    if (submitted) return;
    setSubmitted(true);
    // Grade: correct order is stock, comment, update, digest
    const correct = ['Low stock alert', 'New comment', 'System update', 'Weekly digest'];
    const score = items.filter((item, i) => item === correct[i]).length;
    const choiceId = score >= 3 ? 'A' : score >= 1 ? 'B' : 'C';
    setTimeout(() => onComplete(choiceId), 600);
  };

  return (
    <div className="uitask__body">
      <p className="uitask__instruction">{task.instruction}</p>
      <p className="uitask__sub">Drag to reorder — most important at the top.</p>
      <div className="uitask__reorder-list">
        {items.map((item, i) => (
          <div
            key={item}
            className={`uitask__reorder-item ${dragging === i ? 'dragging' : ''}`}
            draggable
            onDragStart={() => onDragStart(i)}
            onDragOver={e => onDragOver(e, i)}
            onDragEnd={onDragEnd}
            aria-label={`${item}, position ${i + 1}`}
          >
            <span className="reorder-handle" aria-hidden="true">⠿</span>
            <span className="reorder-pos">{i + 1}</span>
            <span className="reorder-label">{item}</span>
          </div>
        ))}
      </div>
      <button
        className="btn btn-defend"
        onClick={handleSubmit}
        disabled={submitted}
        style={{ marginTop: 16 }}
      >
        {submitted ? 'Submitting…' : 'Submit Order →'}
      </button>
    </div>
  );
}

// ── Main UITask Shell ────────────────────────────────────────────────────────
export default function UITask({ task, onComplete }) {
  const renderTask = () => {
    switch (task.type) {
      case 'fitts':     return <FittsTask task={task} onComplete={onComplete} />;
      case 'proximity': return <ProximityTask task={task} onComplete={onComplete} />;
      case 'contrast':  return <ContrastTask task={task} onComplete={onComplete} />;
      case 'reorder':   return <ReorderTask task={task} onComplete={onComplete} />;
      default:          return null;
    }
  };

  return (
    <div className="uitask">
      <div className="uitask__header">
        <div className="uitask__law-tag">🎮 UI TASK · {task.law}</div>
        <div className="uitask__title">{task.title}</div>
      </div>
      <div className="uitask__narration">{task.narration}</div>
      {renderTask()}
    </div>
  );
}
