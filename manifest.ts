import type { ThemeManifest } from "@venore/theme-sdk";

export const erastoLeagueManifest: ThemeManifest = {
  key: "erasto-league",
  name: "Erasto League",
  version: "0.1.1",
  // Contrato de slot atual do host (contexts/themes/contracts/contract-version.ts,
  // SUPPORTED_THEME_CONTRACT_RANGE "^6.0.0") — não "7.0.0" (essa era só o valor copiado do
  // Fearless sem checar contra o core desta instância, o que travava a ativação).
  themeContractVersion: "6.0.0",
  // A marca usa o logo real do site (brand.logoUrl de contexts/settings), via PlatformBrand —
  // mesmo mecanismo que a view de TV do plugin usa (getBrandConfig) pra ficar coerente.
  brandAesthetics: { mode: "svg", size: 78, scrolledSize: 72, position: "left", color: "#22c55e" },
  colorModes: ["light", "dark"],
};
