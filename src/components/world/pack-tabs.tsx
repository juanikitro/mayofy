"use client";

import { type KeyboardEvent, useId, useRef, useState } from "react";

import type { DetailGroup } from "@/components/world/pack-groups";
import { staggerStyle } from "@/components/world/stagger";
import { tabIndexForKey } from "@/lib/tab-keys";

/**
 * The back of a pack card as tabs, one per detail group, always one open
 * (Juani, 24 November 2026: "Sobre la card que crece, añadamos tabs al
 * dorso, siempre una abierta"): the open tab fits the card's front height,
 * so the turned card neither grows nor scrolls inside. The first tab is open
 * each time the card turns (FlipCard remounts its back).
 *
 * Tabs follow the ARIA tabs pattern with automatic activation: one tab stop,
 * Left/Right (and Home/End) move between tabs and open them. Inside the phone
 * carousel the tab row never scrolls on its own, so a horizontal swipe that
 * starts on it still moves the carousel, and a tap opens the tab.
 */
export function PackTabs({ groups }: { groups: readonly DetailGroup[] }) {
  const [open, setOpen] = useState(0);
  /** A tab other than the first was chosen: rows no longer wait for the turn (world.css). */
  const [touched, setTouched] = useState(false);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const next = tabIndexForKey(event.key, open, groups.length);
    if (next === null) return;
    event.preventDefault();
    setOpen(next);
    setTouched(true);
    tabs.current[next]?.focus();
  };

  return (
    <div className="pack-tabs" data-touched={touched ? "" : undefined}>
      <div className="pack-tabs__list" role="tablist" aria-orientation="horizontal">
        {groups.map((group, index) => (
          <button
            key={group.title}
            ref={(node) => {
              tabs.current[index] = node;
            }}
            type="button"
            role="tab"
            id={`${id}-tab-${index}`}
            className="pack-tabs__tab"
            aria-selected={open === index}
            aria-controls={`${id}-panel-${index}`}
            tabIndex={open === index ? 0 : -1}
            onClick={() => {
              setOpen(index);
              setTouched(true);
            }}
            onKeyDown={onKeyDown}
          >
            {group.title}
          </button>
        ))}
      </div>
      {groups.map((group, index) => (
        <div
          key={group.title}
          role="tabpanel"
          id={`${id}-panel-${index}`}
          className="pack-tabs__panel"
          aria-labelledby={`${id}-tab-${index}`}
          tabIndex={0}
          hidden={open !== index}
        >
          <ul className="pack-list">
            {group.items.map((item, row) => (
              <li key={item} style={staggerStyle(row)}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
