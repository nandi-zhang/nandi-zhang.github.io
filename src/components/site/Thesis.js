import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { verbs, themes, manuscripts, workById, shortPapers } from '../../data/research';
import { Authors, Media, Venue } from './parts';

const ROTATE_MS = 2000; // time on each verb
const RESUME_MS = 15000; // pause after the visitor chooses one

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// "[[theme-id|text]]" in the narrative becomes a jump link to that theme.
export function Narrative({ text }) {
  const parts = text.split(/(\[\[[^\]]+\]\])/g);
  return (
    <p className="narrative">
      {parts.map((part, i) => {
        const m = part.match(/^\[\[([^|]+)\|([^\]]+)\]\]$/);
        if (!m) return <React.Fragment key={i}>{part}</React.Fragment>;
        return (
          <a
            key={i}
            href={`#${m[1]}`}
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(m[1]);
              if (el) el.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'start' });
            }}
          >
            <strong>{m[2]}</strong>
          </a>
        );
      })}
    </p>
  );
}

// Selected work (with the rotating sentence), manuscripts under review, and workshop papers.
export default function Thesis() {
  const [idx, setIdx] = useState(0);
  const [prev, setPrev] = useState(null);
  const [roll, setRoll] = useState(0);
  const [hovering, setHovering] = useState(false);
  const pausedUntil = useRef(0);
  const rootRef = useRef(null);
  const wordRef = useRef(null);
  const [wordW, setWordW] = useState(null);
  const v = verbs[idx];

  const go = (i) => {
    if (i === idx) return;
    setPrev(idx);
    setIdx(i);
    setRoll((r) => r + 1);
  };
  const choose = (i) => {
    pausedUntil.current = Date.now() + RESUME_MS;
    go(i);
  };
  const jumpTo = (key) => {
    const el = document.getElementById(`paper-${key}`);
    if (el) el.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'center' });
  };

  // The word's box (and so the underline and period) glides to the new width with the roll.
  useLayoutEffect(() => {
    const measure = () => { if (wordRef.current) setWordW(wordRef.current.offsetWidth); };
    measure();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [idx]);

  // Rotate on its own; hold still while the visitor is pointing at or focused in this section.
  useEffect(() => {
    if (reduceMotion()) return undefined;
    const id = setInterval(() => {
      const root = rootRef.current;
      const inside = root && root.contains(document.activeElement);
      if (document.hidden || hovering || inside || Date.now() < pausedUntil.current) return;
      go((idx + 1) % verbs.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  });

  const find = (vk) => verbs.findIndex((x) => x.key === vk);
  const tagFor = (vi, on) => (
    <span key={on ? `on${roll}` : 'off'} className={`verb-tag ${on ? 'is-on' : ''}`}>
      what people {verbs[vi].verb}
    </span>
  );

  // Plain render functions (not components), so rows keep focus and hover across re-renders.
  const renderRow = (vk) => {
    const vi = find(vk);
    if (vi < 0) return null;
    const w = workById[verbs[vi].paper];
    const on = vi === idx;
    return (
      <li key={vk} id={`paper-${vk}`} className={on ? 'is-on' : ''}>
        <Link to={`/work/${w.id}`} className="workrow" onPointerEnter={() => choose(vi)} onFocus={() => choose(vi)}>
          <Media media={w.media} label={w.short} className="thumb" />
          <span className="workrow-text">
            <span className="workrow-meta"><Venue venue={w.venue} award={w.award} />{tagFor(vi, on)}</span>
            <span className="workrow-title">{w.short}</span>
            <span className="workrow-blurb">{w.blurb}</span>
          </span>
        </Link>
      </li>
    );
  };

  const renderManuscript = (vk) => {
    const vi = find(vk);
    if (vi < 0) return null;
    const on = vi === idx;
    return (
      <li key={vk} id={`paper-${vk}`} className={`manuscript ${on ? 'is-on' : ''}`}>
        <div className="manuscript-row" tabIndex={0} onPointerEnter={() => choose(vi)} onFocus={() => choose(vi)}>
          <p className="pub-meta"><span className="venue">Under review</span>{tagFor(vi, on)}</p>
          <p className="manuscript-text">{verbs[vi].ongoing}</p>
        </div>
      </li>
    );
  };

  const hover = { onPointerEnter: () => setHovering(true), onPointerLeave: () => setHovering(false) };
  const workshop = shortPapers.filter((p) => !verbs.some((x) => x.paper === p.id));

  return (
    <div className="thesis-block" ref={rootRef}>
      <section className="selected" aria-labelledby="work-h" {...hover}>
        <h2 id="work-h" className="home-h">Selected work</h2>
        <p className="flip-thesis">
          From what an interface presents to what people{' '}
          <button
            type="button"
            className="flip-verb"
            onClick={() => { choose(idx); jumpTo(v.key); }}
            aria-label={`${v.verb}. Go to this work`}
          >
            <span className="verb-roll" aria-hidden="true" style={wordW ? { width: `${wordW}px` } : undefined}>
              {prev !== null && (
                <span key={`o${roll}`} className="roll-out" onAnimationEnd={() => setPrev(null)}>
                  {verbs[prev].verb}
                </span>
              )}
              <span key={`i${roll}`} ref={wordRef} className={roll ? 'roll-in' : ''}>{v.verb}</span>
            </span>
          </button>
          .
        </p>
        {themes.map((t) => (
          <div className="research-theme" id={t.id} key={t.id}>
            <h3>{t.title}</h3>
            <p className="theme-blurb">{t.blurb}</p>
            <ul className="worklist">{t.items.map((vk) => renderRow(vk))}</ul>
          </div>
        ))}
      </section>

      {manuscripts.length > 0 && (
        <section className="shortlist" aria-labelledby="ms-h" {...hover}>
          <h2 id="ms-h" className="home-h">Manuscripts under review</h2>
          <ul className="manuscripts">{manuscripts.map((vk) => renderManuscript(vk))}</ul>
        </section>
      )}

      {workshop.length > 0 && (
        <section className="shortlist" aria-labelledby="short-h">
          <h2 id="short-h" className="home-h">Workshop papers and extended abstracts</h2>
          <ul className="pubs">
            {workshop.map((p) => (
              <li key={p.id}>
                <Link to={`/work/${p.id}`} className="pub-title">{p.title}</Link>
                <Authors list={p.authors} />
                <p className="pub-meta"><Venue venue={p.venue} award={p.award} /></p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
