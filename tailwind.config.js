/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      scale: {
        102: "1.02",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
        "courier-mono": ["Courier Prime", "monospace"],
        "share-mono": ["Share Tech Mono", "monospace"],
      },
      colors: {
        accent: "hsl(80, 96%, 46%)",
        "accent-light": "hsl(80, 96%, 71%)",
        "accent-dark": "hsl(80, 96%, 20%)",
        "accent-darker": "hsl(80, 96%, 12%)",
        "accent-darkest": "hsl(65, 71%, 5%)",
        whitish: "#f5f5f5",
        grayish: "rgb(64 64 64)",
        "dark-gray": "rgb(12 12 12)",
      },
      spacing: {
        100: "25rem",
      },
      boxShadow: {
        inner: "0px 0px 10px 0px rgba(0, 0, 0, 1) inset",
        "inner-glow": "0px 0px 10px 0px hsl(65, 71%, 56%) inset",
        outer: "0px 0px 10px 0px rgba(0, 0, 0, 1)",
      },
      gridTemplateColumns: {
        "auto-15": "repeat(auto-fill, 15rem)",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
  darkMode: "class",
  variants: {
    backgroundColor: [
      "responsive",
      "hover",
      "focus",
      "dark",
      "dark:hover",
      "dark:focus",
    ],
    borderColor: [
      "responsive",
      "hover",
      "focus",
      "dark",
      "dark:hover",
      "dark:focus",
    ],
    textColor: [
      "responsive",
      "hover",
      "focus",
      "group-hover",
      "dark",
      "dark:hover",
      "dark:focus",
      "dark:group-hover",
      "focus-within",
      "dark:focus-within",
      "dark:odd",
      "dark:even",
      "dark:active",
      "dark:disabled",
    ],
    borderStyle: ["responsive", "dark"],
    placeholderColor: ["responsive", "focus", "dark:placeholder"],
  },
};
