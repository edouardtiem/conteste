import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bleu-france": "#000091",
        "bleu-france-hover": "#1212FF",
        "bleu-clair": "#E3E3FD",
        "bleu-fond": "#F5F5FE",
        "vert-succes": "#18753C",
        "vert-fond": "#B8FEC9",
        "orange-warning": "#D64D00",
        "orange-fond": "#FFE8E5",
        "rouge-erreur": "#CE0500",
        "gris-titre": "#161616",
        "gris-texte": "#3A3A3A",
        "gris-mention": "#666666",
        "gris-bordure": "#DDDDDD",
        "gris-fond": "#F6F6F6",
        "score-moyen-fond": "#FEF7DA",
        "score-moyen-texte": "#B34000",
      },
      fontFamily: {
        marianne: [
          "Marianne",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      fontSize: {
        "h1-mobile": ["28px", { lineHeight: "1.2", fontWeight: "800" }],
        "h1-desktop": ["36px", { lineHeight: "1.2", fontWeight: "800" }],
        h2: ["22px", { lineHeight: "1.3", fontWeight: "800" }],
        h3: ["18px", { lineHeight: "1.4", fontWeight: "700" }],
        body: ["15px", { lineHeight: "1.6", fontWeight: "400" }],
        mention: ["14px", { lineHeight: "1.4", fontWeight: "400" }],
        badge: ["13px", { lineHeight: "1", fontWeight: "700" }],
        button: ["16px", { lineHeight: "1", fontWeight: "700" }],
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
        "3xl": "64px",
      },
      maxWidth: {
        landing: "1000px",
        flow: "500px",
      },
      borderRadius: {
        card: "8px",
        button: "4px",
        pill: "24px",
      },
    },
  },
  plugins: [],
};
export default config;
