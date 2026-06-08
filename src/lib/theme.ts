// src/lib/theme.ts
export const theme = {
  colors: {
    // change only these tokens; components read tokens instead of hex
    primary: {
      50: "#eef2ff",
      100: "#e0e7ff",
      500: "#2563eb", // default primary
      700: "#1d4ed8"
    },
    secondary: {
      500: "#06b6d4"
    },
    neutral: {
      50: "#f9fafb",
      100: "#f3f4f6",
      700: "#374151"
    },
    success: "#16a34a",
    danger: "#dc2626"
  },
  spacing: {
    sm: "8px",
    md: "16px",
    lg: "24px"
  },
  radii: {
    sm: "6px",
    md: "10px"
  }
};

export type Theme = typeof theme;
