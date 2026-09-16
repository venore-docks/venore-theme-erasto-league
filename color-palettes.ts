import { generateHueRotationPalettes, THEME_HUE_PRESETS } from "@venore/theme-sdk/palettes";

// Catálogo gerado dos tokens de hue de marca do theme.css deste tema (L/C preservados, hue gira) —
// base verde de campo / dourado de troféu.
export const ERASTO_LEAGUE_COLOR_PALETTES = generateHueRotationPalettes(
  {
    light: {
      primary: "oklch(0.5 0.16 149)",
      primaryForeground: "oklch(0.99 0.006 150)",
      accent: "oklch(0.8 0.15 85)",
      accentForeground: "oklch(0.22 0.06 70)",
      ring: "oklch(0.6 0.15 149)",
    },
    dark: {
      primary: "oklch(0.72 0.19 149.6)",
      primaryForeground: "oklch(0.14 0.03 150)",
      accent: "oklch(0.82 0.15 85)",
      accentForeground: "oklch(0.18 0.05 70)",
      ring: "oklch(0.74 0.18 149.6)",
    },
  },
  THEME_HUE_PRESETS,
);
