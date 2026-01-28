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

function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
      <path d="M10.25 3.5a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5zM2.25 10.25a8 8 0 1 1 14.32 4.89l5.15 5.15a.75.75 0 1 1-1.06 1.06l-5.15-5.15A8 8 0 0 1 2.25 10.25z" />
    </svg>
  );
}

function IconHeart() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function IconMessenger() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 3.09 1.59 5.82 4 7.38V22l3.66-2.01A9.96 9.96 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 2a8 8 0 0 1 8 8 8 8 0 0 1-8 8 8 8 0 0 1-6.62-3.5L4 17.5V15.38a7.96 7.96 0 0 1-2-5.38 8 8 0 0 1 8-8z" />
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
      {/* 로고 - 인스타그램 스타일 */}
      <div className="flex items-center gap-2">
        <div className="text-[var(--sns-primary)]">
          <IconLogo />
        </div>
        <span className="text-xl font-semibold tracking-tight text-[var(--sns-text)]">
          Social
        </span>
      </div>

      {/* 우측 아이콘 - 인스타그램 스타일 */}
      <div className="flex items-center gap-5">
        <button
          type="button"
          className="rounded-full p-1.5 text-[var(--sns-icon)] hover:bg-[var(--sns-bg)]"
          aria-label="검색"
        >
          <IconSearch />
        </button>
        <button
          type="button"
          className="rounded-full p-1.5 text-[var(--sns-icon)] hover:bg-[var(--sns-bg)]"
          aria-label="알림"
        >
          <IconHeart />
        </button>
        <button
          type="button"
          className="rounded-full p-1.5 text-[var(--sns-icon)] hover:bg-[var(--sns-bg)]"
          aria-label="메시지"
        >
          <IconMessenger />
        </button>
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[var(--sns-primary)] to-purple-500"
          aria-label="프로필"
        >
          <span className="text-xs font-bold text-white">나</span>
        </button>
      </div>
    </header>
  );
}

export { IconMore };
