"use client";

// AnimatedBackground orbs are pointer-events-none and aria-hidden so they
// never interfere with keyboard or mouse interaction.
export default function AnimatedBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    >
      {/* Primary gradient — bottom-left blue */}
      <div className="absolute bottom-0 left-0 w-[60%] h-[60%] bg-[radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.25)_0%,transparent_65%)]" />

      {/* Secondary gradient — top-right violet */}
      <div className="absolute top-0 right-0 w-[55%] h-[55%] bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.20)_0%,transparent_65%)]" />

      {/* Tertiary gradient — center subtle blue */}
      <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.10)_0%,transparent_70%)]" />
    </div>
  );
}
