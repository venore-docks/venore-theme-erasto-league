import type { ThemeManifest } from "@venore/theme-sdk";

export const erastoLeagueManifest: ThemeManifest = {
  key: "erasto-league",
  name: "Erasto League",
  version: "0.1.0",
  themeContractVersion: "7.0.0",
  // A marca usa o logo real do site (brand.logoUrl de contexts/settings), via PlatformBrand —
  // mesmo mecanismo que a view de TV do plugin usa (getBrandConfig) pra ficar coerente.
  brandAesthetics: { mode: "svg", size: 78, scrolledSize: 72, position: "left", color: "#22c55e" },
  colorModes: ["light", "dark"],
};
