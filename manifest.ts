import type { ThemeManifest } from "@venore/theme-sdk";

export const erastoLeagueManifest: ThemeManifest = {
  key: "erasto-league",
  name: "Erasto League",
  version: "0.2.0",
  // Contrato de slot atual do host (contexts/themes/contracts/contract-version.ts,
  // SUPPORTED_THEME_CONTRACT_RANGE "^6.0.0") — não "7.0.0" (essa era só o valor copiado do
  // Fearless sem checar contra o core desta instância, o que travava a ativação).
  themeContractVersion: "6.0.0",
  // "png", não "svg": o brasão do Erasto League (erasto_league.png) é colorido (navy + dourado +
  // bola cinza) — modo "svg" trataria o arquivo como silhueta monocromática (maskImage +
  // currentColor) e perderia as cores reais. A marca usa o logo real do site (brand.logoUrl de
  // contexts/settings, configurado pelo admin em /admin/settings/brand), via PlatformBrand.
  brandAesthetics: { mode: "png", size: 82, scrolledSize: 68, position: "left", color: "#f3a92a" },
  colorModes: ["light", "dark"],
};
