import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import portrait from '../../media/portrait.jpg';
import LiveLab from './LiveLab';
import Thesis, { Narrative } from './Thesis';
import { Viscosity, Redirection } from './Experiments';
import { profile, news, engineering, education, teaching, service } from '../../data/site';
import { mainPapers, shortPapers, workById, underReview, bibtex } from '../../data/research';
import { Authors, Links, Venue, Tags, Media, CopyBlock } from './parts';

/* ---------------- Home ---------------- */
export function Home() {
  return (
    <article className="home">
      <header className="hello">
        <img className="portrait" src={portrait} alt="Portrait of Nandi Zhang" />
        <div>
          <h1>Hi, I’m Nandi.</h1>
          <p>
            I’m a PhD student in Computer Science at the <a href="https://www.rochester.edu/">University of Rochester</a>,
            working with <a href="https://rochester-bear-lab.github.io/yukang">Prof. Yukang Yan</a> in the{' '}
            <a href="https://rochester-bear-lab.github.io/index">BEAR Lab</a>. I did my MSc in Computer Science with{' '}
            <a href="https://ryosuzuki.org/">Prof. Ryo Suzuki</a> at the <a href="https://ucalgary.ca/">University of Calgary</a>{' '}
            and my BSc in Data Science with <a href="https://www.cse.ust.hk/~mxj/">Prof. Xiaojuan Ma</a> at{' '}
            <a href="https://hkust.edu.hk/">HKUST</a>, and spent a year as a research intern at{' '}
            <a href="https://www.sensetime.com/en">SenseTime</a>.
          </p>
          <Narrative text={profile.narrative} />
          <p className="seeking">{profile.seeking}</p>
        </div>
      </header>

      <section className="newsbox" aria-labelledby="news-h">
        <h2 id="news-h" className="home-h">News</h2>
        <ul className="news">
          {news.map((n) => (
            <li key={n.text}><span className="news-when">{n.when}</span><span>{n.text}</span></li>
          ))}
        </ul>
      </section>

      <Thesis />

      <p className="aside-note">
        Full list on the <Link to="/publications">publications page</Link>.
      </p>
    </article>
  );
}

/* ---------------- Publications ---------------- */
function PubList({ list }) {
  const years = [...new Set(list.map((p) => p.year))];
  return years.map((y) => (
    <section key={y} className="pubyear">
      <h3>{y}</h3>
      <ol className="pubs">
        {list.filter((p) => p.year === y).map((p) => (
          <li key={p.id}>
            <Link to={`/work/${p.id}`} className="pub-title">{p.title}</Link>
            <Authors list={p.authors} />
            <p className="pub-meta"><Venue venue={p.venue} award={p.award} /><Tags list={p.medium} /></p>
          </li>
        ))}
      </ol>
    </section>
  ));
}

export function Publications() {
  const [mine, setMine] = useState(false);
  const [tag, setTag] = useState(null);
  const tags = useMemo(() => [...new Set(mainPapers.flatMap((p) => p.medium || []))], []);
  const keep = (p) => (!mine || p.firstAuthor) && (!tag || (p.medium || []).includes(tag));
  const main = mainPapers.filter(keep);
  const short = shortPapers.filter((p) => !mine || p.firstAuthor);
  return (
    <article>
      <h1 className="page-title">Publications</h1>
      <div className="pubfilters">
        <div className="filter" role="group" aria-label="Authorship">
          <button type="button" aria-pressed={!mine} onClick={() => setMine(false)}>All</button>
          <button type="button" aria-pressed={mine} onClick={() => setMine(true)}>First-author</button>
        </div>
        <div className="tagfilter">
          <span className="muted">Built with</span>
          <Tags list={tags} active={tag} onPick={setTag} />
        </div>
      </div>
      <h2 className="subhead first">Papers</h2>
      <p className="count" aria-live="polite">
        {main.length} {main.length === 1 ? 'paper' : 'papers'}{tag ? ` built with ${tag}` : ''}{mine ? ', first-author' : ''}
      </p>
      <PubList list={main} />
      {!main.length && (
        <p className="muted">
          No papers match.{' '}
          <button type="button" className="textbtn" onClick={() => { setMine(false); setTag(null); }}>Clear filters</button>
        </p>
      )}
      <p className="aside-note">{underReview}</p>
      {!tag && short.length > 0 && (
        <>
          <h2 className="subhead">Workshop papers and extended abstracts</h2>
          <PubList list={short} />
        </>
      )}
    </article>
  );
}

/* ---------------- Video helpers ---------------- */
// Accepts a bare YouTube ID or any common YouTube link.
export function ytId(v) {
  if (!v) return null;
  const m = String(v).match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  if (m) return m[1];
  return /^[\w-]{11}$/.test(v) ? v : null;
}

function YouTube({ id, title, className = '' }) {
  return (
    <div className={`video-embed ${className}`}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={title}
        loading="lazy"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

/* ---------------- One piece of work ---------------- */
export function Work() {
  const { id } = useParams();
  const w = workById[id];
  if (!w) {
    return (
      <article>
        <h1 className="page-title">Nothing here</h1>
        <p>This page doesn’t exist. Try the <Link to="/publications">publications list</Link>.</p>
      </article>
    );
  }
  const seq = w.kind === 'short' ? shortPapers : mainPapers;
  const idx = seq.findIndex((x) => x.id === id);
  const prev = seq[idx - 1];
  const next = seq[idx + 1];
  const isPaper = Boolean(w.authors);
  // Top of the page: looping clips if the paper has them, else the teaser video, else the image.
  // When clips take the top slot, the teaser moves down into the Video section.
  const hasClips = Boolean(w.clips && w.clips.length);
  const teaser = ytId(w.videos && w.videos.teaser);
  const bottomVideos = [
    hasClips && teaser ? { id: teaser, caption: 'Teaser' } : null,
    ytId(w.videos && w.videos.full) ? { id: ytId(w.videos.full), caption: 'Video figure' } : null,
    ytId(w.videos && w.videos.talk) ? { id: ytId(w.videos.talk), caption: 'Talk' } : null,
  ].filter(Boolean);
  return (
    <article className="workpage">
      <p className="crumb"><Link to="/publications">Publications</Link></p>
      <h1 className="page-title">{w.title}</h1>
      <p className="workpage-meta"><Venue venue={isPaper ? w.venue : `${w.venue}, ${w.year}`} award={w.award} /><Tags list={w.medium} /></p>
      {isPaper && <Authors list={w.authors} />}
      <Links links={w.links} />
      {hasClips ? (
        <section className="clips hero-clips">
          {w.clips.map((c) => (
            <figure className="clip" key={c.caption || c.alt}>
              {/* Plays like a GIF: silent, looping, no controls. MP4 is a fraction of a GIF's size. */}
              <video
                poster={c.poster}
                autoPlay
                muted
                loop
                playsInline
                disablePictureInPicture
                preload="auto"
                aria-label={c.alt}
              >
                {c.webm && <source src={c.webm} type="video/webm" />}
                <source src={c.video} type="video/mp4" />
              </video>
              {c.caption && <figcaption>{c.caption}</figcaption>}
            </figure>
          ))}
        </section>
      ) : teaser ? (
        <YouTube id={teaser} title={`${w.short} teaser`} className="hero-media" />
      ) : (
        <Media media={w.media} label={w.short} className="hero-media" />
      )}
      {w.repo && (
        <a className="repo-card" href={w.repo.href} target="_blank" rel="noreferrer">
          <svg viewBox="0 0 16 16" width="22" height="22" aria-hidden="true">
            <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
          <span className="repo-card-text">
            <strong>{w.repo.label}</strong>
            <span>{w.repo.text}</span>
          </span>
        </a>
      )}
      <div className="prose">
        {w.blurb && <p>{w.blurb}</p>}
        {w.role && <p><strong>My role.</strong> {w.role}</p>}
        {w.notes && w.notes.map((n) => <p key={n}>{n}</p>)}
      </div>
      {w.id === 'remapping-time' && <LiveLab />}
      {w.experiment && (
        <section className="tryit">
          <h2 className="subhead">{w.id === 'remapping-time' ? 'Try it: pseudo-texture from delay' : 'Try it'}</h2>
          {w.experiment === 'viscosity' && <Viscosity />}
          {w.experiment === 'redirection' && <Redirection />}
        </section>
      )}
      {w.pipeline && (
        <section className="pipeline">
          <h2 className="subhead">How it’s built</h2>
          <ol className="steps">
            {w.pipeline.steps.map(([k, v]) => (
              <li key={k}><strong>{k}</strong><span>{v}</span></li>
            ))}
          </ol>
          <p className="prose-lite">{w.pipeline.triggers}</p>
          <pre className="code" tabIndex={0}><code>{w.pipeline.code}</code></pre>
          <p className="aside-note">{w.pipeline.note}</p>
          {w.pipeline.repo && (
            <p className="repo-note">
              {w.pipeline.repo.text}{' '}
              <a href={w.pipeline.repo.href} target="_blank" rel="noreferrer">{w.pipeline.repo.label}</a>
            </p>
          )}
        </section>
      )}
      {w.figures && w.figures.length > 0 && (
        <section className="figures">
          <h2 className="subhead">Figures</h2>
          <div className="figure-grid">
            {w.figures.map((g) => (
              <figure className="gallery" key={g.caption || g.alt}>
                <img src={g.image} alt={g.alt} />
                {g.caption && <figcaption>{g.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </section>
      )}
      {bottomVideos.length > 0 && (
        <section className="videos">
          <h2 className="subhead">{bottomVideos.length > 1 ? 'Videos' : 'Video'}</h2>
          <div className={`video-grid ${bottomVideos.length > 1 ? 'two' : ''}`}>
            {bottomVideos.map((v) => (
              <figure key={v.id}>
                <YouTube id={v.id} title={`${w.short} ${v.caption.toLowerCase()}`} />
                <figcaption>{v.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
      {isPaper && (
        <section className="cite">
          <h2 className="subhead">Cite</h2>
          <CopyBlock text={bibtex(w)} label="BibTeX" />
        </section>
      )}
      <nav className="prevnext" aria-label="More work">
        {prev ? <Link to={`/work/${prev.id}`}><span className="muted">Previous</span>{prev.short}</Link> : <span />}
        {next ? <Link to={`/work/${next.id}`} className="next"><span className="muted">Next</span>{next.short}</Link> : <span />}
      </nav>
    </article>
  );
}

/* ---------------- Background ---------------- */
export function Background() {
  return (
    <article className="background">
      <h1 className="page-title">Background</h1>
      <section>
        <h2 className="subhead">Education</h2>
        <ul className="plain">
          {education.map((e) => (
            <li key={e.place}><strong>{e.place}</strong><span>{e.what}</span><span className="muted">{e.when}</span></li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="subhead">Industry research</h2>
        <p className="prose-lite">{engineering.intro}</p>
        {engineering.items.map((it) => (
          <div className="eng" key={it.title}>
            <h3>{it.title} <span className="muted">{it.when}</span></h3>
            <p>{it.body}</p>
          </div>
        ))}
      </section>
      <section>
        <h2 className="subhead">Teaching</h2>
        <p className="prose-lite">
          I also enjoy teaching.
        </p>
        <ul className="plain">
          {teaching.map((t) => (
            <li key={t.course}><strong>{t.course}</strong><span>{t.role}, {t.where}</span><span className="muted">{t.when}</span></li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="subhead">Service</h2>
        <ul className="plain">
          <li><strong>Reviewer</strong><span>{service.reviewing}</span></li>
          <li><strong>Student volunteer</strong><span>{service.other}</span></li>
        </ul>
      </section>
    </article>
  );
}