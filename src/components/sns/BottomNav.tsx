"use client";

function IconHome() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden>
      <path d="M12 2.5L2 10v11h7v-7h6v7h7V10L12 2.5zm0 2.35l6 4.8V19h-3v-6H9v6H6v-9.35l6-4.8z" />
    </svg>
  );
}

function IconSearchNav() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden>
      <path d="M10.25 3.5a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5zM2.25 10.25a8 8 0 1 1 14.32 4.89l5.15 5.15a.75.75 0 1 1-1.06 1.06l-5.15-5.15A8 8 0 0 1 2.25 10.25z" />
    </svg>
  );
}

function IconAdd() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden>
      <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 3a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H8a1 1 0 1 1 0-2h3V8a1 1 0 0 1 1-1z" />
    </svg>
  );
}

function IconHeartNav() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden>
      <path d="M16.697 5.5c-1.222-.06-2.679.51-2.679 2.31 0 1.593.222 2.87.301 3.273.128.573.811 1.088 1.317 1.256.507.168 1.086.205 1.528.205.442 0 1.022-.037 1.528-.205.506-.168 1.189-.683 1.317-1.256.079-.403.301-1.68.301-3.273 0-1.8-1.457-2.37-2.679-2.31zM9 6.25C7.755 6.25 6.75 7.255 6.75 8.5c0 1.746.222 2.954.303 3.367.082.414.566 1.006 1.072 1.181.505.175 1.093.232 1.569.232.476 0 1.064-.057 1.57-.232.506-.175.99-.767 1.071-1.181.081-.413.303-1.62.303-3.367C11.25 7.255 10.245 6.25 9 6.25z" />
      <path
        fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM3.75 12a8.25 8.25 0 1 1 16.5 0 8.25 8.25 0 0 1-16.5 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function IconProfile() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden>
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 2a8 8 0 0 1 8 8 8 8 0 0 1-8 8 8 8 0 0 1-8-8 8 8 0 0 1 8-8zm0 3a2.5 2.5 0 0 0-2.5 2.5 2.5 2.5 0 0 0 2.5 2.5 2.5 2.5 0 0 0 2.5-2.5A2.5 2.5 0 0 0 12 7zm0 10c2.21 0 4.195-.97 5.547-2.5H6.453C7.805 16.03 9.79 17 12 17z" />
    </svg>
  );
}

const navItems = [
  { icon: IconHome, label: "홈", active: true },
  { icon: IconSearchNav, label: "검색", active: false },
  { icon: IconAdd, label: "만들기", active: false },
  { icon: IconHeartNav, label: "좋아요", active: false },
  { icon: IconProfile, label: "프로필", active: false },
];

export function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around border-t border-[var(--sns-divider)] bg-[var(--sns-header)] py-2 sns-card-shadow"
      style={{ height: "var(--sns-bottom-nav-height)" }}
      aria-label="하단 탐색"
    >
      {navItems.map(({ icon: Icon, label, active }) => (
        <button
          key={label}
          type="button"
          className={`flex flex-col items-center gap-0.5 rounded-lg px-4 py-1 ${
            active
              ? "text-[var(--sns-primary)]"
              : "text-[var(--sns-text-secondary)]"
          }`}
          aria-label={label}
          aria-current={active ? "page" : undefined}
        >
          <Icon />
          <span className="text-[10px]">{label}</span>
        </button>
      ))}
    </nav>
  );
}
