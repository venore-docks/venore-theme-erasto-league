import { generateHueRotationPalettes, THEME_HUE_PRESETS } from "@venore/theme-sdk/palettes";

// Catálogo gerado dos tokens de hue de marca do theme.css deste tema (L/C preservados, hue gira)
// — base monocromática azul: primary quase-preto/quase-branco (chroma baixo, a rotação de hue
// quase não muda ele, de propósito) + UM accent azul saturado (esse sim rotaciona de verdade).
export const ERASTO_LEAGUE_COLOR_PALETTES = generateHueRotationPalettes(
  {
    light: {
      primary: "oklch(0.28 0.03 250)",
      primaryForeground: "oklch(0.97 0.004 250)",
      accent: "oklch(0.6 0.16 255)",
      accentForeground: "oklch(0.98 0.012 255)",
      ring: "oklch(0.6 0.16 255)",
    },
    dark: {
      primary: "oklch(0.88 0.006 250)",
      primaryForeground: "oklch(0.18 0.02 250)",
      accent: "oklch(0.68 0.15 255)",
      accentForeground: "oklch(0.16 0.03 255)",
      ring: "oklch(0.68 0.15 255)",
    },
  },
  THEME_HUE_PRESETS,
);
