import { generateHueRotationPalettes, THEME_HUE_PRESETS } from "@venore/theme-sdk/palettes";

// Catálogo gerado dos tokens de hue de marca do theme.css deste tema (L/C preservados, hue gira)
// — base navy+dourado do brasão (v3, ver comentário no topo do theme.css): primary carrega o
// navy de verdade (chroma 0.07/0.022, não mais quase-preto/quase-branco neutro) + accent dourado
// saturado. Rotacionar o hue aqui gera as variantes "trocar cor do time" pro catálogo de paletas
// do admin — o par navy/dourado em si (preset "erasto-league" implícito, hue 254/75) só existe
// mesmo no theme.css, este arquivo só cataloga as variações.
export const ERASTO_LEAGUE_COLOR_PALETTES = generateHueRotationPalettes(
  {
    light: {
      primary: "oklch(0.3 0.07 254)",
      primaryForeground: "oklch(0.98 0.008 90)",
      accent: "oklch(0.78 0.15 75)",
      accentForeground: "oklch(0.2 0.05 75)",
      ring: "oklch(0.78 0.15 75)",
    },
    dark: {
      primary: "oklch(0.88 0.022 254)",
      primaryForeground: "oklch(0.18 0.038 254)",
      accent: "oklch(0.8 0.14 75)",
      accentForeground: "oklch(0.18 0.045 75)",
      ring: "oklch(0.8 0.14 75)",
    },
  },
  THEME_HUE_PRESETS,
);
