import React from "react";

export function Card({ children }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
      {children}
    </div>
  );
}

export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={[
        "inline-flex items-center justify-center rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-950",
        "hover:bg-white disabled:cursor-not-allowed disabled:opacity-60",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ children, className = "", ...props }) {
  return (
    <button
      className={[
        "inline-flex items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm font-medium text-zinc-100",
        "hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-60",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}

export function Input({ className = "", ...props }) {
  return (
    <input
      className={[
        "w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500",
        "focus:outline-none focus:ring-2 focus:ring-zinc-500/40",
        className,
      ].join(" ")}
      {...props}
    />
  );
}

export function Badge({ status }) {
  const map = {
    queued: "border-zinc-700 bg-zinc-900 text-zinc-200",
    building: "border-blue-700/60 bg-blue-950 text-blue-200",
    success: "border-emerald-700/60 bg-emerald-950 text-emerald-200",
    failed: "border-red-700/60 bg-red-950 text-red-200",
  };
  const cls = map[status] || map.queued;
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs ${cls}`}>
      {status}
    </span>
  );
}

