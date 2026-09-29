import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import './App.css';
import { profile } from './data/site';
import { mainPapers, workById } from './data/research';
import { Home, Publications, Work, Background } from './components/site/pages';

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  });
  useEffect(() => {
    const root = document.documentElement;
    if (theme) root.dataset.theme = theme; else delete root.dataset.theme;
    try { if (theme) localStorage.setItem('theme', theme); } catch (e) { /* storage unavailable */ }
  }, [theme]);
  const isDark = theme ? theme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  return [isDark, () => setTheme(isDark ? 'light' : 'dark')];
}

function Sidebar({ open, onNavigate }) {
  const { pathname } = useLocation();
  const inWork = pathname.startsWith('/publications') || pathname.startsWith('/work/');
  const [expanded, setExpanded] = useState(true);
  const [isDark, toggle] = useTheme();
  useEffect(() => { if (inWork) setExpanded(true); }, [inWork]);

  const workLinks = mainPapers;
  return (
    <aside className={`sidebar ${open ? 'is-open' : ''}`} id="sidebar">
      <nav aria-label="Site">
        <ul className="tree">
          <li><NavLink to="/" end onClick={onNavigate}>Home</NavLink></li>
          <li>
            <div className="tree-row">
              <NavLink to="/publications" onClick={onNavigate}>Publications</NavLink>
              <button
                type="button"
                className="caret"
                aria-expanded={expanded}
                aria-controls="tree-pubs"
                aria-label={expanded ? 'Collapse publications' : 'Expand publications'}
                onClick={() => setExpanded(!expanded)}
              >
                <svg viewBox="0 0 10 10" width="10" height="10" aria-hidden="true"><path d="M3 2 L7 5 L3 8" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
              </button>
            </div>
            <ul className="tree-sub" id="tree-pubs" hidden={!expanded}>
              {workLinks.map((w) => (
                <li key={w.id}><NavLink to={`/work/${w.id}`} onClick={onNavigate}>{w.short}</NavLink></li>
              ))}
            </ul>
          </li>
          <li><NavLink to="/background" onClick={onNavigate}>Background</NavLink></li>
        </ul>
      </nav>
      <div className="sidebar-foot">
        <ul className="contact">
          {profile.links.map((l) => (
            <li key={l.label}>
              <a href={l.href} target={l.href.startsWith('mailto') ? undefined : '_blank'} rel="noreferrer">{l.label}</a>
            </li>
          ))}
        </ul>
        <button type="button" className="theme" onClick={toggle} aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}>
          {isDark ? 'Light theme' : 'Dark theme'}
        </button>
      </div>
    </aside>
  );
}

function Shell() {
  const { pathname } = useLocation();
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    setMenu(false);
    const id = pathname.startsWith('/work/') ? pathname.slice(6) : null;
    const titles = { '/': 'Nandi Zhang', '/publications': 'Publications | Nandi Zhang', '/background': 'Background | Nandi Zhang' };
    document.title = id && workById[id] ? `${workById[id].short} | Nandi Zhang` : titles[pathname] || 'Nandi Zhang';
  }, [pathname]);

  return (
    <div className="layout">
      <a className="skip" href="#main" onClick={(e) => { e.preventDefault(); document.getElementById('main').focus(); }}>Skip to content</a>
      <header className="masthead">
        <NavLink to="/" className="name">
          {profile.name} <span className="zh" lang="zh">{profile.nameZh}</span>
        </NavLink>
        <button type="button" className="menubtn" aria-expanded={menu} aria-controls="sidebar" onClick={() => setMenu(!menu)}>
          {menu ? 'Close' : 'Menu'}
        </button>
      </header>
      <Sidebar open={menu} onNavigate={() => setMenu(false)} />
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/work/:id" element={<Work />} />
          <Route path="/background" element={<Background />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <footer className="foot">
          <p>{profile.name}, <a href={`mailto:${profile.email}`}>{profile.email}</a></p>
        </footer>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Shell />
    </HashRouter>
  );
}
