import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        "primary-color": "#A88B35",
        "dark-primary-color": "#8E742A",
        "secondary-color": "#C0C1C5",
        "main-color": "#363F40",
        "light-main-color": "#9AA9AA",
        "cream": "#F5F4F0",

      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
