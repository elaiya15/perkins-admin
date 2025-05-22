/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"];
export const theme = {
  extend: {
    colors: {
      spangles: {
        50: "#D3F1F4",
        100: "#BEE9EE",
        200: "#A8E2E8",
        300: "#92DBE3",
        400: "#7CD4DD",
        500: "#66CDD7",
        600: "#51C5D1",
        700: "#3BBECC",
        800: "#25B7C6",
        900: "#25B7C6",
        950: "#25B7C6",
      },
    },
  },
};
export const plugins = [
  require("flowbite/plugin"),
  require("@tailwindcss/typography"),
];
