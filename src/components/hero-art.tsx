import { getImageProps } from "next/image";

export function HeroArt() {
  const common = {
    alt: "Un cauce de luz verde atraviesa un bosque húmedo nocturno hacia un claro.",
    sizes: "100vw",
    quality: 80,
    loading: "eager" as const,
    fetchPriority: "high" as const,
  };
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...common,
    src: "/images/hero-umbral-desktop.png",
    width: 1816,
    height: 866,
  });
  const {
    props: { srcSet: mobileSrcSet, alt: mobileAlt, ...mobileProps },
  } = getImageProps({
    ...common,
    src: "/images/hero-umbral-mobile.png",
    width: 972,
    height: 1626,
  });

  return (
    <picture className="hero-art">
      <source media="(min-width: 48rem)" srcSet={desktopSrcSet} />
      <source media="(max-width: 47.99rem)" srcSet={mobileSrcSet} />
      <img {...mobileProps} className="hero-art__image" alt={mobileAlt} />
    </picture>
  );
}
