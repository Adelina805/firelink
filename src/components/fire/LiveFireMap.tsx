"use client";

import { useState } from "react";

const LIVE_MAP_URL =
  "https://gis.data.cnra.ca.gov/maps/CALFIRE-Forestry::eaton-fire-structure-status-map/explore?location=34.182220,-118.153460,13";

export function LiveFireMap() {
  const [mapUnavailable, setMapUnavailable] = useState(false);

  return (
    <section aria-labelledby="live-eaton-fire-map-title" className="rounded-2xl border border-(--card-border) bg-(--card) p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3
            id="live-eaton-fire-map-title"
            className="text-base font-bold text-foreground"
          >
            Live Eaton Fire Map
          </h3>
          <p className="mt-0.5 text-xs text-(--muted-foreground)">
            Structure status and damage inspection map from CAL FIRE / CNRA public GIS data.
          </p>
        </div>
        <a
          href={LIVE_MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-lg border border-amber-500/40 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-900 transition hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40 dark:border-amber-400/40 dark:bg-amber-950/30 dark:text-amber-100 dark:hover:bg-amber-950/45"
        >
          Open full map
        </a>
      </div>

      <div className="mt-3 overflow-hidden rounded-xl border border-(--card-border) bg-slate-100 dark:bg-slate-900/40">
        {mapUnavailable ? (
          <div className="flex h-[360px] w-full flex-col items-center justify-center gap-3 px-6 text-center md:h-[520px]">
            <p className="text-sm font-semibold text-foreground">Live map unavailable.</p>
            <p className="text-xs text-(--muted-foreground)">
              Open the CAL FIRE / CNRA map in a new tab.
            </p>
            <a
              href={LIVE_MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-(--card-border) bg-(--card) px-3 py-1.5 text-xs font-semibold text-foreground transition hover:bg-slate-100 dark:hover:bg-slate-800/70"
            >
              Open full map
            </a>
          </div>
        ) : (
          <iframe
            title="Live Eaton Fire Structure Status Map"
            src={LIVE_MAP_URL}
            className="h-[360px] w-full border-0 md:h-[520px]"
            loading="lazy"
            allowFullScreen
            onError={() => setMapUnavailable(true)}
          />
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-[11px] font-medium uppercase tracking-wide text-(--muted-foreground)">
          Source: CAL FIRE / CNRA GIS
        </p>
      </div>

      <p className="mt-3 rounded-xl border border-amber-500/25 bg-amber-50/70 p-3 text-xs leading-snug text-amber-950 dark:border-amber-500/35 dark:bg-amber-950/25 dark:text-amber-100">
        Map data may lag official evacuation orders. Follow local emergency instructions.
      </p>
    </section>
  );
}
