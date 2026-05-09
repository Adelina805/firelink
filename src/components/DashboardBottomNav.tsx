"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
  /** Short label for narrow screens */
  shortLabel: string;
};

function buildNav(zip: string): NavItem[] {
  const base = `/dashboard/${zip}`;
  return [
    { href: base, label: "Home", shortLabel: "Home" },
    { href: `${base}/needs`, label: "Needs", shortLabel: "Needs" },
    { href: `${base}/households`, label: "Households", shortLabel: "Homes" },
    { href: `${base}/resources`, label: "Resources", shortLabel: "Res." },
  ];
}

function isActive(pathname: string, href: string): boolean {
  const isZipRoot = /\/dashboard\/[^/]+$/.test(href);
  if (isZipRoot) {
    return pathname === href;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DashboardBottomNav({ zip }: { zip: string }) {
  const pathname = usePathname();
  const items = buildNav(zip);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-zinc-950/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-lg"
      aria-label="Dashboard sections"
    >
      <ul className="mx-auto flex max-w-6xl justify-between gap-0 px-2 py-2 sm:px-4">
        {items.map(({ href, label, shortLabel }) => {
          const active = isActive(pathname, href);
          return (
            <li key={href} className="min-w-0 flex-1">
              <Link
                href={href}
                aria-label={label}
                className={`flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-2 text-[10px] font-semibold uppercase tracking-wide transition sm:min-h-0 sm:text-xs ${
                  active
                    ? "text-amber-300"
                    : "text-white/55 hover:text-white/85"
                }`}
                aria-current={active ? "page" : undefined}
              >
                <span className="sm:hidden">{shortLabel}</span>
                <span className="hidden sm:inline">{label}</span>
                <span
                  className={`mt-0.5 h-0.5 w-8 rounded-full sm:w-10 ${
                    active ? "bg-amber-400" : "bg-transparent"
                  }`}
                  aria-hidden
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
