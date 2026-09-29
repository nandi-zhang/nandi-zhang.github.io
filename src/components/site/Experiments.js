import React, { useEffect, useRef, useState } from 'react';

const W = 760;
const H = 260;

function useCanvasLoop(draw) {
  const ref = useRef(null);
  const drawRef = useRef(draw);
  drawRef.current = draw;
  useEffect(() => {
    let raf;
    let last = null;
    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      const dt = last === null ? 1 / 60 : Math.min(0.05, (now - last) / 1000);
      last = now;
      const c = ref.current;
      if (c) drawRef.current(c.getContext('2d'), dt, now / 1000);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  return ref;
}

const toCanvas = (e, c) => {
  const r = c.getBoundingClientRect();
  return { x: ((e.clientX - r.left) / r.width) * W, y: ((e.clientY - r.top) / r.height) * H };
};

const colors = (c) => {
  const s = getComputedStyle(c);
  return {
    ink: s.getPropertyValue('--ink').trim() || '#1a2140',
    muted: s.getPropertyValue('--muted').trim() || '#565e78',
    rose: s.getPropertyValue('--rose').trim() || '#f3b6c4',
    roseInk: s.getPropertyValue('--rose-ink').trim() || '#6b0f2b',
    panel: s.getPropertyValue('--panel').trim() || '#e6e9ee',
  };
};

/* Object-centered time remapping: the deeper your pointer goes into the water,
   the further behind the displayed "hand" falls. Nothing resists the pointer;
   only what you see of it is delayed. */
export function Viscosity() {
  const st = useRef({ samples: [], pointer: null, d: 0 });
  const [showReal, setShowReal] = useState(false);
  const showRef = useRef(showReal);
  showRef.current = showReal;
  const WATER_X = W * 0.45;

  const ref = useCanvasLoop((ctx, dt, t) => {
    const s = st.current;
    const col = colors(ctx.canvas);
    if (s.pointer) {
      s.samples.push({ t, x: s.pointer.x, y: s.pointer.y });
      while (s.samples.length && s.samples[0].t < t - 3) s.samples.shift();
    }
    const cur = s.pointer;
    const depth = cur && cur.x > WATER_X ? Math.min(1, (cur.x - WATER_X) / (W - WATER_X)) : 0;
    const u = depth > 0 ? 0.35 + 0.6 * depth : 0;
    const a = depth > 0 ? 0.2 : 8;
    s.d = Math.max(0, Math.min(2.5, s.d + dt * (u - a * s.d)));
    const g = t - s.d;
    let shown = null;
    for (let i = s.samples.length - 1; i >= 0; i -= 1) {
      if (s.samples[i].t <= g) { shown = s.samples[i]; break; }
    }
    if (!shown && s.samples.length) [shown] = s.samples;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = col.panel;
    ctx.fillRect(0, 0, W, H);
    const grd = ctx.createLinearGradient(WATER_X, 0, W, 0);
    grd.addColorStop(0, 'rgba(70,130,200,0.25)');
    grd.addColorStop(1, 'rgba(40,90,170,0.55)');
    ctx.fillStyle = grd;
    ctx.fillRect(WATER_X, 0, W - WATER_X, H);
    ctx.strokeStyle = 'rgba(255,255,255,0.35)';
    ctx.lineWidth = 1.5;
    for (let k = 0; k < 6; k += 1) {
      ctx.beginPath();
      for (let x = WATER_X; x <= W; x += 8) {
        const y = 30 + k * 40 + Math.sin(x / 30 + t * 1.5 + k) * 4;
        if (x === WATER_X) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    ctx.fillStyle = col.muted;
    ctx.font = '600 14px "Helvetica Neue", Helvetica, Arial, sans-serif';
    ctx.fillText('Air', 20, 28);
    ctx.fillText('Water, deeper to the right', WATER_X + 16, 28);

    if (cur && showRef.current) {
      ctx.strokeStyle = col.muted;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(cur.x, cur.y, 14, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    if (shown) {
      ctx.fillStyle = col.roseInk;
      ctx.beginPath();
      ctx.arc(shown.x, shown.y, 12, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = col.muted;
      ctx.fillText('Move your pointer or finger here', W / 2 - 110, H / 2);
    }
    ctx.fillStyle = col.muted;
    ctx.font = '13px "Helvetica Neue", Helvetica, Arial, sans-serif';
    ctx.fillText(`Display behind by ${s.d.toFixed(2)} s`, 20, H - 16);
  });

  return (
    <figure className="exp">
      <canvas
        ref={ref}
        width={W}
        height={H}
        className="exp-canvas"
        onPointerMove={(e) => { st.current.pointer = toCanvas(e, e.currentTarget); }}
        onPointerDown={(e) => { st.current.pointer = toCanvas(e, e.currentTarget); }}
        onPointerLeave={() => { st.current.pointer = null; }}
        aria-label="Move the pointer through air and water; the dot lags more the deeper it goes"
        role="img"
      />
      <figcaption>
        <strong>Feel the water.</strong> Move through the air, then into the water. Nothing slows your hand; only what you
        see of it is delayed, more with depth, and the water can start to feel thick. This is the paper’s
        object-centered remapping, applied to a cursor.
        <label className="exp-toggle">
          <input type="checkbox" checked={showReal} onChange={(e) => setShowReal(e.target.checked)} /> Show where the
          pointer really is
        </label>
      </figcaption>
    </figure>
  );
}

/* Hand redirection: the displayed hand travels further than the real one. */
export function Redirection() {
  const START = { x: 90, y: H / 2 };
  const TARGET = { x: 640, y: H / 2 };
  const LIMIT = 470;
  const st = useRef({ drag: false, pointer: null, reached: false, realAtReach: 0 });
  const [showReal, setShowReal] = useState(false);
  const [msg, setMsg] = useState('');
  const showRef = useRef(showReal);
  showRef.current = showReal;

  const gainAt = (dx) => {
    const k = Math.min(1, Math.max(0, (dx - 80) / 240));
    return 1 + 0.4 * k * k * (3 - 2 * k);
  };

  const ref = useCanvasLoop((ctx) => {
    const s = st.current;
    const col = colors(ctx.canvas);
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = col.panel;
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = col.muted;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(LIMIT, 20);
    ctx.lineTo(LIMIT, H - 20);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = col.muted;
    ctx.font = '600 13px "Helvetica Neue", Helvetica, Arial, sans-serif';
    ctx.fillText('Your usual reach', LIMIT + 8, 36);
    ctx.strokeStyle = col.roseInk;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(TARGET.x, TARGET.y, 22, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = col.ink;
    ctx.beginPath();
    ctx.arc(START.x, START.y, 8, 0, Math.PI * 2);
    ctx.fill();

    let shown = START;
    if (s.drag && s.pointer) {
      const dx = Math.max(0, s.pointer.x - START.x);
      const dy = s.pointer.y - START.y;
      shown = { x: START.x + dx * gainAt(dx), y: START.y + dy };
      if (!s.reached && Math.hypot(shown.x - TARGET.x, shown.y - TARGET.y) < 22) {
        s.reached = true;
        const realPct = Math.round((dx / (TARGET.x - START.x)) * 100);
        setMsg(`Reached. Your real movement covered ${realPct}% of the distance you saw.`);
      }
      if (showRef.current) {
        ctx.strokeStyle = col.muted;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(s.pointer.x, s.pointer.y, 14, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }
    ctx.fillStyle = s.reached ? col.roseInk : col.ink;
    ctx.beginPath();
    ctx.arc(shown.x, shown.y, 13, 0, Math.PI * 2);
    ctx.fill();
    if (!s.drag && !s.reached) {
      ctx.fillStyle = col.muted;
      ctx.font = '13px "Helvetica Neue", Helvetica, Arial, sans-serif';
      ctx.fillText('Press, then drag the hand toward the ring', START.x - 20, START.y + 40);
    }
  });

  const down = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const s = st.current;
    s.drag = true;
    s.reached = false;
    s.pointer = { x: START.x, y: START.y };
    s.origin = toCanvas(e, e.currentTarget);
    setMsg('');
  };
  const move = (e) => {
    const s = st.current;
    if (!s.drag) return;
    const p = toCanvas(e, e.currentTarget);
    s.pointer = { x: START.x + (p.x - s.origin.x), y: START.y + (p.y - s.origin.y) };
  };
  const up = () => { st.current.drag = false; };

  return (
    <figure className="exp">
      <canvas
        ref={ref}
        width={W}
        height={H}
        className="exp-canvas"
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        role="img"
        aria-label="Drag a virtual hand toward a target beyond your usual reach; the hand moves further than your pointer"
      />
      <figcaption>
        <strong>Reach past your limit.</strong> Drag the hand to the ring. Past the halfway point, the displayed hand
        travels further than your real movement, the same kind of offset the rehabilitation study used to make a
        reach feel more successful.
        <span className="exp-msg" aria-live="polite">{msg}</span>
        <label className="exp-toggle">
          <input type="checkbox" checked={showReal} onChange={(e) => setShowReal(e.target.checked)} /> Show where the
          pointer really is
        </label>
      </figcaption>
    </figure>
  );
}
