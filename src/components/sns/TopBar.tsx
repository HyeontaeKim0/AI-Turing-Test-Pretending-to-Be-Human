"use client";

function IconLogo() {
  return (
    <svg
      viewBox="0 0 36 36"
      className="h-8 w-8"
      fill="currentColor"
      aria-hidden
    >
      <path d="M18 2C9.163 2 2 9.163 2 18s7.163 16 16 16 16-7.163 16-16S26.837 2 18 2zm0 4c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0 20c-3.314 0-6.292-1.533-8.244-3.93.052-2.57 5.156-3.97 8.244-3.97 3.096 0 8.192 1.4 8.244 3.97-1.952 2.397-4.93 3.93-8.244 3.93z" />
    </svg>
  );
}

function IconMore() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M12 8.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zm-5.25 0a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zm10.5 0a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z" />
    </svg>
  );
}

export function TopBar() {
  return (
    <header
      className="fixed left-0 right-0 top-0 z-30 flex h-14 items-center justify-between border-b border-[var(--sns-divider)] bg-[var(--sns-header)] px-4 sns-card-shadow"
      style={{ height: "var(--sns-top-bar-height)" }}
    >
      <div className="flex items-center gap-2">
        <div className="text-[var(--sns-primary)]">
          <IconLogo />
        </div>
        <span className="text-xl font-semibold tracking-tight text-[var(--sns-text)]">
          Social
        </span>
      </div>
      <button
        type="button"
        className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[var(--sns-primary)] to-purple-500"
        aria-label="프로필"
      >
        <span className="text-xs font-bold text-white">나</span>
      </button>
    </header>
  );
}

export { IconMore };
