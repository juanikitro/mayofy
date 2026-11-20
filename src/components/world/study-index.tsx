"use client";

import { useActiveIsland } from "@/components/world/use-active-island";

const chapters = [
  { id: "contexto", label: "Contexto" },
  { id: "desafio", label: "Desafío" },
  { id: "enfoque", label: "Enfoque" },
  { id: "decisiones", label: "Decisiones" },
  { id: "recorrido", label: "Recorrido" },
  { id: "galeria", label: "Galería" },
] as const;

const chapterIds = chapters.map((chapter) => chapter.id);

/** Sticky index of a case study; the chapter in view is marked as the current location. */
export function StudyIndex() {
  const active = useActiveIsland(chapterIds);

  return (
    <nav className="study__index" aria-label="Recorrido del caso">
      {chapters.map((chapter) => (
        <a href={`#${chapter.id}`} key={chapter.id} aria-current={active === chapter.id ? "location" : undefined}>
          {chapter.label}
        </a>
      ))}
    </nav>
  );
}
