import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Taiko brand pink — anchors the accent palette.
        taiko: {
          50: "#fff0f6",
          100: "#ffe0ed",
          200: "#ffb8d4",
          300: "#ff8ab8",
          400: "#ff4990",
          500: "#e81899", // primary
          600: "#c40f80",
          700: "#9c0b66",
          800: "#71084a",
          900: "#4a0530",
        },
        // Neutral dark palette tuned for the gradient backdrop.
        ink: {
          900: "#0a0612",
          800: "#13091f",
          700: "#1c0d2e",
          600: "#28133e",
          500: "#3b1d56",
          400: "#5a3175",
          300: "#8654a8",
          200: "#b591d2",
          100: "#dec8ec",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', '"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      backgroundImage: {
        // Reusable Taiko gradients.
        "taiko-glow":
          "radial-gradient(ellipse at top, rgba(232,24,153,0.18) 0%, transparent 60%)",
        "taiko-pink":
          "linear-gradient(135deg, #e81899 0%, #9c0b66 50%, #5a3175 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
