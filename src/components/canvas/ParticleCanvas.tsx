import { useEffect, useRef } from "react";

type Node = { x: number; y: number; bx: number; by: number; phase: number };
type Edge = { a: number; b: number };
type Packet = { e: number; t: number; speed: number };

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let running = true;
    let mx = -9999;
    let my = -9999;
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    const packets: Packet[] = [];

    const seed = () => {
      nodes.length = 0;
      edges.length = 0;
      packets.length = 0;
      const mobile = width < 768;
      const cols = mobile ? 7 : 14;
      const rows = mobile ? 5 : 8;
      const jitter = mobile ? 4 : 7;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = ((c + (r % 2) * 0.5 + 0.5) / cols) * width;
          const y = ((r + 0.55) / rows) * height;
          nodes.push({
            x,
            y,
            bx: x + (Math.random() - 0.5) * jitter,
            by: y + (Math.random() - 0.5) * jitter,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
      const idx = (c: number, r: number) => r * cols + c;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = idx(c, r);
          if (c + 1 < cols) edges.push({ a: i, b: idx(c + 1, r) });
          if (r + 1 < rows) {
            edges.push({ a: i, b: idx(c, r + 1) });
            const diag = c + (r % 2 === 0 ? -1 : 1);
            if (diag >= 0 && diag < cols) edges.push({ a: i, b: idx(diag, r + 1) });
          }
        }
      }
      const packetCount = mobile ? 6 : 14;
      for (let i = 0; i < packetCount; i++) {
        packets.push({
          e: Math.floor(Math.random() * edges.length),
          t: Math.random(),
          speed: 0.0022 + Math.random() * 0.0034,
        });
      }
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const paintStatic = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = "rgba(99, 102, 241, 0.09)";
      ctx.lineWidth = 1;
      for (const edge of edges) {
        const a = nodes[edge.a];
        const b = nodes[edge.b];
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      ctx.fillStyle = "rgba(34, 211, 238, 0.45)";
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.15, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const tick = () => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);

      for (const n of nodes) {
        n.phase += 0.008;
        const dxm = mx - n.bx;
        const dym = my - n.by;
        const dist = Math.hypot(dxm, dym);
        const pull = dist < 160 && dist > 0.1 ? 10 * (1 - dist / 160) : 0;
        const tx = n.bx + (pull ? (dxm / dist) * pull : 0) + Math.cos(n.phase) * 1.2;
        const ty = n.by + (pull ? (dym / dist) * pull : 0) + Math.sin(n.phase * 0.9) * 1.2;
        n.x += (tx - n.x) * 0.08;
        n.y += (ty - n.y) * 0.08;
      }

      ctx.lineWidth = 1;
      for (const edge of edges) {
        const a = nodes[edge.a];
        const b = nodes[edge.b];
        ctx.strokeStyle = "rgba(99, 102, 241, 0.11)";
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      for (const p of packets) {
        p.t += p.speed;
        if (p.t > 1) {
          p.t = 0;
          p.e = Math.floor(Math.random() * edges.length);
        }
        const edge = edges[p.e];
        const a = nodes[edge.a];
        const b = nodes[edge.b];
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        ctx.fillStyle = "rgba(34, 211, 238, 0.85)";
        ctx.beginPath();
        ctx.arc(x, y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = "rgba(34, 211, 238, 0.5)";
      for (const n of nodes) {
        const dist = Math.hypot(mx - n.x, my - n.y);
        const r = dist < 90 ? 1.8 : 1.15;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      frame = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(frame);
      } else if (!running && !reduce) {
        running = true;
        frame = requestAnimationFrame(tick);
      }
    };

    resize();
    if (reduce) {
      paintStatic();
    } else {
      frame = requestAnimationFrame(tick);
    }
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-30"
      aria-hidden="true"
    />
  );
}
