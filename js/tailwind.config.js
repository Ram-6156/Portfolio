/* Tailwind CDN theme configuration.
   Must be loaded right after the Tailwind CDN script. */
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        brand: {
          bg: "#07090e",
          surface: "#0e121a",
          card: "#141a24",
          border: "#202b3c",
          cyan: "#00f0ff",
          blue: "#3b82f6",
          purple: "#8b5cf6",
          emerald: "#10b981",
        },
      },
      animation: {
        "pulse-glow": "pulseGlow 4s infinite alternate",
        "spin-slow": "spin 20s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%": { opacity: "0.3", transform: "scale(0.98)" },
          "100%": { opacity: "0.7", transform: "scale(1.02)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
};
