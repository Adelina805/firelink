"use client";

import { useLayoutEffect, useState } from "react";

export function ThemeToggle() {
  /** Must match server render; sync from DOM after hydration (see theme script in layout `<head>`). */
  const [isDark, setIsDark] = useState(false);

  useLayoutEffect(() => {
    // Initial `false` matches SSR; script in `<head>` may already have set `.dark` on `<html>`.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot sync from external DOM; not derivable on server
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleTheme() {
    const nextIsDark = !isDark;
    setIsDark(nextIsDark);
    document.documentElement.classList.toggle("dark", nextIsDark);
    window.localStorage.setItem("theme", nextIsDark ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-8 items-center justify-center rounded-full border border-zinc-400 bg-white px-2.5 text-[11px] font-semibold text-zinc-900 shadow-sm transition hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60 dark:border-zinc-500 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
    >
      {isDark ? "Dark" : "Light"}
    </button>
  );
}
