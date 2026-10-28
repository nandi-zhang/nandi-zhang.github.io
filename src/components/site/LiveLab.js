import React, { useCallback, useEffect, useRef, useState } from 'react';

// A browser version of time remapping (Zhang & Yan, UIST 2026).
// The display shows source time g(t) = t - d(t), where the offset follows
//   d'(t) = u(t) - alpha(t) * d(t)
// integrated once per frame. Holding (or automatic motion detection) injects
// offset; releasing switches to a high recovery gain that catches back up.

const W = 1200;
const H = 675;
const DEAL_PERIOD = 3.4; // seconds between deals, in source time
const FLIGHT = 0.62; // seconds a card is in the air
const EXPOSURE = 1 / 9; // perceptual integration window at playback rate 1
const SUITS = ['♠', '♥', '♦', '♣'];
const HOLD_ALPHA = 0.05;
const CAM_BUFFER_S = 4; // seconds of camera history kept for replay

// Pick the replay buffer for this device. Frame rate comes first (slow motion reveals it),
// then the largest 16:9 resolution whose frames fit a memory budget scaled to the device.
// Frames are stored uncompressed (w x h x 4 bytes each), so this is what keeps phones from crashing.
function planBuffer(fps, vw, vh) {
  const mem = navigator.deviceMemory || 4; // GB; Safari doesn't report it, so assume a mid-range device
  const phone = window.matchMedia('(pointer: coarse)').matches; // phone browsers kill tabs earlier
  const budgetMB = phone ? 150 : mem >= 8 ? 360 : mem >= 4 ? 200 : 100;
  const budget = budgetMB * 1024 * 1024;
  const frames = Math.ceil(CAM_BUFFER_S * fps) + 2;
  const srcH = Math.min(vh, (vw * 9) / 16); // tallest 16:9 crop the camera can supply
  const heights = [1080, 900, 720, 576, 540, 480, 432, 360, 288, 270, 225];
  const h = heights.find((x) => x <= srcH && Math.round((x * 16) / 9) * x * 4 * frames <= budget) || 225;
  return { w: Math.round((h * 16) / 9), h, fps, frames };
}

const rand = (k) => {
  const x = Math.sin(k * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
const cardOf = (k) => ({ rank: 2 + Math.floor(rand(k) * 8), suit: SUITS[Math.floor(rand(k + 17.3) * 4)] });

const START = { x: 150, y: 520 };
const END = { x: 1050, y: 470 };
const C = 1.3; // card scale

function cardPose(p) {
  const x = START.x + (END.x - START.x) * p;
  const y = START.y + (END.y - START.y) * p - 360 * 4 * p * (1 - p);
  const rot = -0.6 + 1.0 * p;
  return { x, y, rot };
}

function drawTable(ctx, w, h) {
  const g = ctx.createRadialGradient(w * 0.5, h * 0.55, 40, w * 0.5, h * 0.55, w * 0.7);
  g.addColorStop(0, '#26305a');
  g.addColorStop(1, '#141a33');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  const s = w / W;
  ctx.strokeStyle = 'rgba(255,255,255,0.14)';
  ctx.setLineDash([6 * s, 6 * s]);
  ctx.lineWidth = 2 * s;
  ctx.strokeRect((END.x - 80) * s, (END.y - 108) * s, 160 * s, 216 * s);
  ctx.setLineDash([]);
  for (let i = 5; i >= 0; i -= 1) {
    drawBack(ctx, START.x * s + i * 1.5 * s, START.y * s - i * 2 * s, 0, s);
  }
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawBack(ctx, x, y, rot, s) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  const k = s * C;
  roundRect(ctx, -52 * k, -74 * k, 104 * k, 148 * k, 8 * k);
  ctx.fillStyle = '#f3b6c4';
  ctx.fill();
  ctx.strokeStyle = '#6b0f2b';
  ctx.lineWidth = 2 * k;
  roundRect(ctx, -44 * k, -66 * k, 88 * k, 132 * k, 5 * k);
  ctx.stroke();
  ctx.restore();
}

function drawFace(ctx, x, y, rot, card, s) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  const k = s * C;
  roundRect(ctx, -52 * k, -74 * k, 104 * k, 148 * k, 8 * k);
  ctx.fillStyle = '#fbfbf8';
  ctx.fill();
  const red = card.suit === '♥' || card.suit === '♦';
  ctx.fillStyle = red ? '#c0223b' : '#1a2140';
  ctx.font = `700 ${34 * k}px "Helvetica Neue", Helvetica, Arial, sans-serif`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(String(card.rank), -42 * k, -64 * k);
  ctx.font = `${30 * k}px Arial, sans-serif`;
  ctx.fillText(card.suit, -42 * k, -28 * k);
  ctx.restore();
}

// Draw the moving card as it would look at source time ts.
function drawCardAt(ctx, ts, s) {
  const k = Math.floor(ts / DEAL_PERIOD);
  const local = ts - k * DEAL_PERIOD;
  const card = cardOf(k);
  if (local < FLIGHT) {
    const p = local / FLIGHT;
    const { x, y, rot } = cardPose(p);
    if (p > 0.2 && p < 0.8) drawFace(ctx, x * s, y * s, rot, card, s);
    else drawBack(ctx, x * s, y * s, rot, s);
  } else {
    drawBack(ctx, END.x * s, END.y * s, 0.3, s);
  }
}

// Render the scene at source time ts, integrating over a window that scales with
// playback rate: fast playback smears the card, slow playback keeps it legible.
function drawCountdown(ctx, ts, s) {
  const local = ts - Math.floor(ts / DEAL_PERIOD) * DEAL_PERIOD;
  const left = DEAL_PERIOD - local;
  if (left > 1.5) return;
  const n = Math.ceil(left / 0.5);
  ctx.save();
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.font = `700 ${56 * s}px "Helvetica Neue", Helvetica, Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(String(n), START.x * s, (START.y - 170) * s);
  ctx.restore();
}

function renderSynthetic(ctx, ts, rate, w, h) {
  const s = w / W;
  drawTable(ctx, w, h);
  drawCountdown(ctx, ts, s);
  // Motion blur trails *behind* the current moment: the solid card is always drawn at
  // the displayed time ts. Trail length scales with playback rate but is capped, so a
  // fast catch-up doesn't smear the card back to where it was a second ago.
  const win = EXPOSURE * Math.min(Math.max(rate, 0.05), 1.5);
  const N = 8;
  ctx.save();
  for (let j = N; j >= 1; j -= 1) {
    ctx.globalAlpha = 0.28 * (1 - j / (N + 1));
    drawCardAt(ctx, ts - (win * j) / N, s);
  }
  ctx.restore();
  drawCardAt(ctx, ts, s);
}

export default function LiveLab() {
  const stageRef = useRef(null);
  const insetRef = useRef(null);
  const plotRef = useRef(null);
  const videoRef = useRef(null);
  const state = useRef({
    d: 0,
    last: null,
    held: false,
    active: false,
    history: [],
    camFrames: [],
    camW: 400,
    camH: 225,
    camOn: false,
    lastVT: -1,
    lastMotionT: 0,
    camIndex: 0,
    lastCap: 0,
    motion: 0,
    motionQuiet: 0,
    prevSmall: null,
    visible: true,
  });
  const [mode, setMode] = useState('user'); // 'user' | 'system'
  const [source, setSource] = useState('cards'); // 'cards' | 'camera'
  const [u, setU] = useState(0.8);
  const [alpha, setAlpha] = useState(8);
  const [readout, setReadout] = useState({ r: 1, d: 0, active: false });
  const [revealed, setRevealed] = useState(null);
  const [camError, setCamError] = useState('');
  const [camInfo, setCamInfo] = useState('');
  const smallRef = useRef(null);
  const [running, setRunning] = useState(true);
  const params = useRef({ mode, source, u, alpha, running });
  params.current = { mode, source, u, alpha, running };

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setRunning(false);
  }, []);

  // Pause work when the lab is off screen.
  useEffect(() => {
    const el = stageRef.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([e]) => { state.current.visible = e.isIntersecting; });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const stopCamera = useCallback(() => {
    const st = state.current;
    st.camOn = false;
    // Shrink every buffered canvas to 0x0 so browsers (Safari especially) release the
    // memory right away instead of waiting for garbage collection.
    st.camFrames.forEach((f) => {
      if (f.canvas) {
        f.canvas.width = 0;
        f.canvas.height = 0;
        f.canvas = null;
      }
    });
    st.camFrames = [];
    st.prevSmall = null;
    // Stop the stream through our own handle: when the page unmounts, React has already
    // cleared videoRef by the time this cleanup runs, so the element can't be relied on.
    if (st.stream) {
      st.stream.getTracks().forEach((tr) => tr.stop());
      st.stream = null;
    }
    const v = videoRef.current;
    if (v) v.srcObject = null;
  }, []);

  useEffect(() => () => stopCamera(), [stopCamera]);

  // Switching tabs or locking the phone turns the camera off and frees the buffer;
  // the demo goes back to the card deal, and the visitor can turn the camera on again.
  useEffect(() => {
    const onHide = () => {
      if (document.hidden && state.current.camOn) {
        stopCamera();
        state.current.d = 0;
        setSource('cards');
        setCamError('The camera turned off when you left the page. Use it again any time.');
      }
    };
    document.addEventListener('visibilitychange', onHide);
    return () => document.removeEventListener('visibilitychange', onHide);
  }, [stopCamera]);

  // Copy the newest camera frame into the ring buffer, cropped to 16:9 and mirrored.
  const captureFrame = () => {
    const st = state.current;
    const v = videoRef.current;
    if (!st.camOn || !st.visible || !v || v.readyState < 2 || !params.current.running) return;
    const t = st.clock || 0;
    let slot = st.camFrames[st.camIndex];
    if (!slot.canvas) {
      slot.canvas = document.createElement('canvas');
      slot.canvas.width = st.camW;
      slot.canvas.height = st.camH;
    }
    const c = slot.canvas.getContext('2d');
    // Crop to the buffer's 16:9 shape instead of stretching (like object-fit: cover).
    // Phones often deliver portrait frames, and the shape can change if the phone rotates.
    const vw = v.videoWidth || st.camW;
    const vh = v.videoHeight || st.camH;
    const k = Math.max(st.camW / vw, st.camH / vh);
    const sw = st.camW / k;
    const sh = st.camH / k;
    c.save();
    c.translate(st.camW, 0);
    c.scale(-1, 1);
    c.drawImage(v, (vw - sw) / 2, (vh - sh) / 2, sw, sh, 0, 0, st.camW, st.camH);
    c.restore();
    slot.t = t;
    st.camIndex = (st.camIndex + 1) % st.camFrames.length;
    // Frame-difference motion energy for the automatic trigger, sampled at about 30 Hz
    // so the threshold means the same thing at 30 or 60 fps.
    if (t - st.lastMotionT >= 1 / 30 && smallRef.current) {
      st.lastMotionT = t;
      const sm = smallRef.current;
      sm.drawImage(slot.canvas, 0, 0, 64, 36);
      const px = sm.getImageData(0, 0, 64, 36).data;
      if (st.prevSmall) {
        let sum = 0;
        for (let q = 0; q < px.length; q += 16) sum += Math.abs(px[q] - st.prevSmall[q]);
        st.motion = sum / (px.length / 16);
      }
      st.prevSmall = new Uint8ClampedArray(px);
    }
  };

  const startCamera = async () => {
    setCamError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          frameRate: { ideal: 60 },
          aspectRatio: { ideal: 16 / 9 },
        },
        audio: false,
      });
      state.current.stream = stream;
      const v = videoRef.current;
      v.srcObject = stream;
      await v.play();
      const set = stream.getVideoTracks()[0].getSettings();
      const fps = Math.min(60, Math.max(15, Math.round(set.frameRate || 30)));
      const plan = planBuffer(fps, v.videoWidth || set.width || 1280, v.videoHeight || set.height || 720);
      const st = state.current;
      st.camW = plan.w;
      st.camH = plan.h;
      st.camFrames = Array.from({ length: plan.frames }, () => ({ canvas: null, t: -Infinity }));
      st.camIndex = 0;
      st.prevSmall = null;
      st.d = 0;
      st.camOn = true;
      // Capture every frame the camera delivers (requestVideoFrameCallback where supported;
      // otherwise the draw loop checks for new frames).
      if ('requestVideoFrameCallback' in v) {
        const onFrame = () => {
          captureFrame();
          if (state.current.camOn) v.requestVideoFrameCallback(onFrame);
        };
        v.requestVideoFrameCallback(onFrame);
      }
      setCamInfo(
        `Camera ${v.videoWidth}×${v.videoHeight} at ${fps} fps; replay buffer ${plan.w}×${plan.h}, ${CAM_BUFFER_S} s.`,
      );
      setSource('camera');
    } catch (e) {
      setCamError('The camera isn’t available here, so the demo keeps running on the simulated card deal.');
    }
  };

  const useCards = () => {
    stopCamera();
    state.current.d = 0;
    setSource('cards');
  };

  // Main loop.
  useEffect(() => {
    let raf;
    const stage = stageRef.current;
    const inset = insetRef.current;
    const plot = plotRef.current;
    const sctx = stage.getContext('2d');
    const ictx = inset.getContext('2d');
    const pctx = plot.getContext('2d');
    const small = document.createElement('canvas');
    small.width = 64;
    small.height = 36;
    smallRef.current = small.getContext('2d', { willReadFrequently: true });
    let lastReadout = 0;

    const frameAt = (target) => {
      const frames = state.current.camFrames;
      let best = null;
      for (let i = 0; i < frames.length; i += 1) {
        const f = frames[i];
        if (f.t <= target && (!best || f.t > best.t)) best = f;
      }
      if (!best) {
        for (let i = 0; i < frames.length; i += 1) if (!best || frames[i].t < best.t) best = frames[i];
      }
      return best;
    };

    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      const st = state.current;
      const p = params.current;
      if (!st.visible) { st.last = null; return; }
      const raw = st.last === null ? 1 / 60 : Math.min(0.05, (now - st.last) / 1000);
      st.last = now;
      const dt = p.running ? raw : 0;
      st.clock = (st.clock || 0.9) + dt;
      const t = st.clock;

      // Camera capture happens per camera frame in captureFrame(); browsers without
      // requestVideoFrameCallback fall back to checking for a new frame here.
      let cam = null;
      if (p.source === 'camera') {
        const v = videoRef.current;
        if (v && !('requestVideoFrameCallback' in v) && v.currentTime !== st.lastVT) {
          st.lastVT = v.currentTime;
          captureFrame();
        }
        cam = true;
      }

      // Decide whether remapping is active.
      let active;
      if (p.mode === 'user') {
        active = st.held;
      } else if (p.source === 'cards') {
        const local = t - Math.floor(t / DEAL_PERIOD) * DEAL_PERIOD;
        active = local < FLIGHT + 1.1; // the "hand" is away from the deck for about a second and a half
      } else {
        if (st.motion > 9) st.motionQuiet = 0; else st.motionQuiet += dt;
        active = st.motionQuiet < 0.35;
      }
      st.active = active;

      // Offset dynamics (Euler step), clamped to what the buffer can serve.
      const uu = active ? p.u : 0;
      const aa = active ? HOLD_ALPHA : p.alpha;
      const maxD = p.source === 'camera' ? CAM_BUFFER_S - 0.25 : 6;
      st.d = Math.min(maxD, Math.max(0, st.d + dt * (uu - aa * st.d)));
      const g = t - st.d;
      const rate = 1 - uu + aa * st.d;

      // Draw.
      if (cam) {
        const f = frameAt(g);
        const fr = frameAt(t);
        if (f && f.t > -Infinity) sctx.drawImage(f.canvas, 0, 0, W, H);
        else { sctx.fillStyle = '#141a33'; sctx.fillRect(0, 0, W, H); }
        if (fr && fr.t > -Infinity) ictx.drawImage(fr.canvas, 0, 0, inset.width, inset.height);
      } else {
        renderSynthetic(sctx, g, rate, W, H);
        renderSynthetic(ictx, t, 1, inset.width, inset.height);
      }

      // History plot of the offset.
      st.history.push({ t, d: st.d, a: active });
      while (st.history.length && st.history[0].t < t - 8) st.history.shift();
      const pw = plot.width;
      const ph = plot.height;
      pctx.clearRect(0, 0, pw, ph);
      const css = getComputedStyle(plot);
      const ink = css.getPropertyValue('--ink').trim() || '#1a2140';
      const rose = css.getPropertyValue('--rose').trim() || '#f3b6c4';
      const x = (tt) => ((tt - (t - 8)) / 8) * pw;
      pctx.fillStyle = rose;
      st.history.forEach((hh, i) => {
        if (hh.a && i > 0) pctx.fillRect(x(st.history[i - 1].t), 0, x(hh.t) - x(st.history[i - 1].t) + 1, ph);
      });
      pctx.strokeStyle = ink;
      pctx.lineWidth = 2;
      pctx.beginPath();
      const maxPlot = 1.5;
      st.history.forEach((hh, i) => {
        const y = ph - 4 - (Math.min(hh.d, maxPlot) / maxPlot) * (ph - 8);
        if (i === 0) pctx.moveTo(x(hh.t), y); else pctx.lineTo(x(hh.t), y);
      });
      pctx.stroke();

      if (now - lastReadout > 100) {
        lastReadout = now;
        setReadout({ r: Math.max(0, rate), d: st.d, active });
      }
      st.g = g;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const hold = (v) => { state.current.held = v; };
  const onKey = (down) => (e) => {
    if (e.code === 'Space') { e.preventDefault(); hold(down); }
  };

  const reveal = () => {
    const g = state.current.g || 0;
    const k = Math.floor((g - FLIGHT) / DEAL_PERIOD);
    if (k < 0) { setRevealed('No card has landed yet.'); return; }
    const c = cardOf(k);
    const names = { '♠': 'spades', '♥': 'hearts', '♦': 'diamonds', '♣': 'clubs' };
    setRevealed(`The last card was the ${c.rank} of ${names[c.suit]} ${c.suit}`);
  };

  return (
    <section className="lab" aria-labelledby="lab-h">
      <div className="lab-head">
        <h2 id="lab-h" className="subhead">Try it</h2>
        <p>
          A card is dealt after each 3, 2, 1 countdown, too fast to read.{' '}
          {mode === 'user'
            ? 'Press and hold the scene on “1”: the display slows and falls behind the present, then catches up when you let go.'
            : 'The system now slows the display automatically whenever the deal starts, like the paper’s system-controlled condition.'}{' '}
          It runs this paper’s offset model in your browser.
        </p>
      </div>

      <div
        className={`lab-stage ${readout.active ? 'is-active' : ''}`}
        tabIndex={0}
        role="button"
        aria-pressed={readout.active}
        aria-label="Press and hold to slow displayed time"
        onPointerDown={(e) => { if (mode === 'user') { e.currentTarget.setPointerCapture(e.pointerId); hold(true); } }}
        onPointerUp={() => hold(false)}
        onPointerCancel={() => hold(false)}
        onKeyDown={mode === 'user' ? onKey(true) : undefined}
        onKeyUp={mode === 'user' ? onKey(false) : undefined}
      >
        <canvas ref={stageRef} width={W} height={H} className="lab-canvas" />
        <div className="lab-inset">
          <canvas ref={insetRef} width={300} height={169} />
          <span>Real time</span>
        </div>
        <div className="lab-hud" aria-live="off">
          <span className="lab-state">{readout.active ? 'Remapping' : 'Live'}</span>
          <span>playback {readout.r.toFixed(2)}×</span>
          <span>behind by {readout.d.toFixed(2)} s</span>
        </div>
        {!running && (
          <button type="button" className="lab-play" onClick={(e) => { e.stopPropagation(); setRunning(true); }}>
            Start the demo
          </button>
        )}
        <video ref={videoRef} playsInline muted className="lab-video" />
      </div>

      <div className="lab-plot">
        <canvas ref={plotRef} width={960} height={70} aria-hidden="true" />
        <span className="muted">Offset over the last 8 seconds; shaded while remapping is active.</span>
      </div>

      <div className="lab-controls">
        <div className="filter" role="group" aria-label="Who triggers remapping">
          <button type="button" aria-pressed={mode === 'user'} onClick={() => setMode('user')}>I hold to slow</button>
          <button type="button" aria-pressed={mode === 'system'} onClick={() => setMode('system')}>System detects motion</button>
        </div>
        <label className="lab-slider">
          <span>Slowdown <strong>{(1 - u).toFixed(2)}×</strong></span>
          <input type="range" min="0.3" max="0.95" step="0.05" value={u} onChange={(e) => setU(Number(e.target.value))} />
        </label>
        <label className="lab-slider">
          <span>Catch-up gain <strong>{alpha.toFixed(0)}</strong></span>
          <input type="range" min="1" max="12" step="1" value={alpha} onChange={(e) => setAlpha(Number(e.target.value))} />
        </label>
        <div className="lab-actions">
          {source === 'cards' ? (
            <>
              <button type="button" className="textbtn" onClick={reveal}>What was the last card?</button>
              <button type="button" className="textbtn" onClick={startCamera}>Use my camera</button>
            </>
          ) : (
            <button type="button" className="textbtn" onClick={useCards}>Back to the card deal</button>
          )}
        </div>
      </div>
      <p className="lab-note" aria-live="polite">
        {camError || revealed || (source === 'camera'
          ? `Wave a hand and hold the scene. Video stays on your device; nothing is recorded or sent. ${camInfo}`
          : 'Keyboard: focus the scene and hold Space.')}
      </p>
    </section>
  );
}