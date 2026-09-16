import type { HeaderBrand } from "@venore/theme-sdk";

// Modo texto/svg/png, variante scrolled, posição — altura vem de --ui-control-height-lg
// multiplicado pela porcentagem de size/scrolledSize, largura derivada por aspect-ratio.
const BRAND_ASPECT_RATIO = "100 / 68";

export function PlatformBrand({
  name,
  mode,
  size,
  scrolledSize,
  position,
  isScrolled,
  logoUrl,
  scrolledLogoUrl,
}: HeaderBrand & { isScrolled: boolean }) {
  const originClass = position === "center" ? "origin-center" : "origin-left";
  const baseTransform = isScrolled ? "transform-[scale(var(--brand-scale-scrolled))]" : "transform-[scale(var(--brand-scale-top))]";

  if (mode === "text") {
    return <span className="font-medium">{name}</span>;
  }

  return (
    <span
      className={
        "block h-[calc(var(--ui-control-height-lg)*0.92*(var(--brand-size-pct)/100))] " +
        "md:h-[calc(var(--ui-control-height-lg)*1.32*(var(--brand-size-pct)/100))] " +
        originClass +
        ` ${baseTransform} group-data-[scrolled=true]/header:transform-[scale(var(--brand-scale-scrolled))] group-data-[scrolled=false]/header:transform-[scale(var(--brand-scale-top))] ` +
        "ui-motion-emphasis"
      }
      style={{
        aspectRatio: BRAND_ASPECT_RATIO,
        ["--brand-size-pct" as string]: size,
        ["--brand-scale-top" as string]: 1,
        ["--brand-scale-scrolled" as string]: scrolledSize / size,
      }}
    >
      {mode === "svg" ? (
        <span
          aria-label={name}
          role="img"
          className="block h-full w-full bg-current ui-motion-base"
          style={{
            maskImage: `url('${logoUrl}')`,
            WebkitMaskImage: `url('${logoUrl}')`,
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
            maskSize: "contain",
            WebkitMaskSize: "contain",
          }}
        />
      ) : (
        <span className="relative block h-full w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoUrl}
            alt={name}
            className={
              "absolute inset-0 h-full w-full object-contain ui-motion-base " +
              (isScrolled ? "opacity-0" : "opacity-100") +
              " group-data-[scrolled=true]/header:opacity-0 group-data-[scrolled=false]/header:opacity-100"
            }
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={scrolledLogoUrl}
            alt=""
            aria-hidden
            className={
              "absolute inset-0 h-full w-full object-contain ui-motion-base " +
              (isScrolled ? "opacity-100" : "opacity-0") +
              " group-data-[scrolled=true]/header:opacity-100 group-data-[scrolled=false]/header:opacity-0"
            }
          />
        </span>
      )}
    </span>
  );
}
