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
