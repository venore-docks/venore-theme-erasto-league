import type { ThemeManifest } from "@venore/theme-sdk";

export const erastoLeagueManifest: ThemeManifest = {
  key: "erasto-league",
  name: "Erasto League",
  // v0.5.0: paleta reconectada ao brasão (navy #123a5c pro fundo/chrome/primary, dourado
  // #f3a92a como accent único — ver theme.css) depois do feedback de que a v0.3.0/0.4.0, toda
  // monocromática-azul, "não conversava com a logo". v0.4.0: shell sem UserMenu/dropdown de
  // conta nem link "Entrar" (pedido explícito — site puramente público, voltado aos widgets do
  // plugin; acesso à plataforma só via /login digitado direto, ver components/Rail.tsx).
  // Extensão aditiva do contrato de slot (tema simplesmente ignora header.user/onSignOut/
  // userNavItems — sancionado em contracts/types.ts), não muda themeContractVersion.
  version: "0.5.0",
  // Contrato de slot atual do host (contexts/themes/contracts/contract-version.ts,
  // SUPPORTED_THEME_CONTRACT_RANGE "^6.0.0") — não "7.0.0" (essa era só o valor copiado do
  // Fearless sem checar contra o core desta instância, o que travava a ativação).
  themeContractVersion: "6.0.0",
  // "png", não "svg": o brasão do Erasto League (erasto_league.png) é colorido — modo "svg"
  // trataria o arquivo como silhueta monocromática (maskImage + currentColor) e perderia as
  // cores reais. A marca usa o logo real do site (brand.logoUrl de contexts/settings,
  // configurado pelo admin em /admin/settings/brand), via PlatformBrand. `color` é o dourado do
  // brasão (mesmo accent de --accent no theme.css) — antes era o azul, trocado junto da paleta.
  brandAesthetics: { mode: "png", size: 76, scrolledSize: 64, position: "left", color: "#f3a92a" },
  colorModes: ["light", "dark"],
};
