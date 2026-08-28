export function AmbientGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="grid-fade absolute inset-0 opacity-70" />
      <div className="orb orb-accent -left-24 top-[-8%] h-[420px] w-[420px] opacity-70" />
      <div className="orb orb-signal right-[-10%] top-[18%] h-[380px] w-[380px] opacity-50" />
      <div className="orb orb-accent bottom-[-12%] left-1/3 h-[320px] w-[320px] opacity-30" />
    </div>
  );
}
