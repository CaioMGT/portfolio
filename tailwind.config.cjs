/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./dist/*", "./dist/code/*", "./dist/code/blog/*", "./dist/blog/*"],
  theme: {
    extend: {},
  },
  fontFamily: {
    roboto: ["roboto"],
  },
  plugins: [],
};
