import React, { useState } from 'react';
import { ME } from '../../data/research';

export const Authors = ({ list }) => (
  <p className="authors">
    {list.map((a, i) => (
      <React.Fragment key={a}>
        {a === ME ? <strong>{a}</strong> : a}
        {i < list.length - 1 ? ', ' : ''}
      </React.Fragment>
    ))}
  </p>
);

export const Links = ({ links }) =>
  links && links.length ? (
    <p className="links">
      {links.map((l) => (
        <a key={l.label} href={l.href} target={l.href.startsWith('mailto') ? undefined : '_blank'} rel="noreferrer">
          {l.label}
        </a>
      ))}
    </p>
  ) : null;

export const Venue = ({ venue, award }) => (
  <span className="venue">
    <span>{venue}</span>
    {award && <span className="award">{award}</span>}
  </span>
);

export const Tags = ({ list, active, onPick }) =>
  list && list.length ? (
    <ul className="tags" aria-label="Built with">
      {list.map((t) => (
        <li key={t}>
          {onPick ? (
            <button type="button" aria-pressed={active === t} onClick={() => onPick(active === t ? null : t)}>
              {t}
            </button>
          ) : (
            <span>{t}</span>
          )}
        </li>
      ))}
    </ul>
  ) : null;

export function Media({ media, label, className = '' }) {
  if (media && media.video) {
    return (
      <div className={`media ${className}`}>
        <video src={media.video} autoPlay muted loop playsInline aria-label={media.alt} />
      </div>
    );
  }
  if (media && media.image) {
    return (
      <div className={`media ${media.fit === 'contain' ? 'media-contain' : ''} ${className}`}>
        <img src={media.image} alt={media.alt} />
      </div>
    );
  }
  return (
    <div className={`media media-empty ${className}`} aria-hidden="true">
      <span>{label}</span>
    </div>
  );
}

export function CopyBlock({ text, label }) {
  const [state, setState] = useState('idle');
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setState('done');
    } catch (e) {
      setState('failed');
    }
    setTimeout(() => setState('idle'), 1800);
  };
  return (
    <div className="copyblock">
      <button type="button" onClick={copy}>
        {state === 'done' ? 'Copied' : state === 'failed' ? 'Select and copy manually' : `Copy ${label}`}
      </button>
      <pre tabIndex={0}><code>{text}</code></pre>
    </div>
  );
}
