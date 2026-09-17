import type { ThemeManifest } from "@venore/theme-sdk";

export const erastoLeagueManifest: ThemeManifest = {
  key: "erasto-league",
  name: "Erasto League",
  // v0.4.0: shell sem UserMenu/dropdown de conta nem link "Entrar" (pedido explícito — site
  // puramente público, voltado aos widgets do plugin; acesso à plataforma só via /login digitado
  // direto, ver components/Rail.tsx). Extensão aditiva do contrato de slot (tema simplesmente
  // ignora header.user/onSignOut/userNavItems — sancionado em contracts/types.ts), não muda
  // themeContractVersion.
  version: "0.4.0",
  // Contrato de slot atual do host (contexts/themes/contracts/contract-version.ts,
  // SUPPORTED_THEME_CONTRACT_RANGE "^6.0.0") — não "7.0.0" (essa era só o valor copiado do
  // Fearless sem checar contra o core desta instância, o que travava a ativação).
  themeContractVersion: "6.0.0",
  // "png", não "svg": o brasão do Erasto League (erasto_league.png) é colorido — modo "svg"
  // trataria o arquivo como silhueta monocromática (maskImage + currentColor) e perderia as
  // cores reais. A marca usa o logo real do site (brand.logoUrl de contexts/settings,
  // configurado pelo admin em /admin/settings/brand), via PlatformBrand. `color` é o azul único
  // de accent do tema (não mais dourado — paleta virou monocromática/azul, ver theme.css).
  brandAesthetics: { mode: "png", size: 76, scrolledSize: 64, position: "left", color: "#3b7ddd" },
  colorModes: ["light", "dark"],
};
