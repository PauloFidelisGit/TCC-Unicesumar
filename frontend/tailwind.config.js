/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {},
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class", // only generate classes
    }),
    require("tailwindcss-animate"),
  ],
};
