/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textColor: {
        color: {
          primary: "var(--color-primary)",
          secondary: "var(--color-secondary)",
        },
      },
      backgroundColor: {
        color: {
          primary: "var(--color-primary)",
          secondary: "var(--color-secondary)",
        },
      },
      fontFamily: {
        kdam: "var(--font-kdam)",
        inconsolata: "var(--font-inconsolata)",
      },
      screens: {
        vs: "370px",
      },
    },
  },
  plugins: [],
};
