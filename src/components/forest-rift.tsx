import { getImageProps } from "next/image";

const common = {
  alt: "",
  sizes: "100vw",
  loading: "lazy",
  decoding: "async",
} as const;

export function ForestRift() {
  const {
    props: { srcSet: desktopSrcSet, ...desktopImageProps },
  } = getImageProps({
    ...common,
    src: "/images/forest-rift-desktop-hq.png",
    width: 1774,
    height: 887,
    quality: 90,
  });
  const {
    props: { srcSet: mobileSrcSet },
  } = getImageProps({
    ...common,
    src: "/images/forest-rift-mobile-hq.png",
    width: 862,
    height: 1825,
    quality: 90,
  });

  return (
    <div className="forest-rift" data-bridge aria-hidden="true">
      <picture>
        <source media="(max-width: 48rem)" srcSet={mobileSrcSet} />
        <source media="(min-width: 48.001rem)" srcSet={desktopSrcSet} />
        <img
          {...desktopImageProps}
          className="forest-rift__image"
          alt=""
        />
      </picture>
    </div>
  );
}
