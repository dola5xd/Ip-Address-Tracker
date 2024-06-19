/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        veryDark_Gray: "hsl(0, 0%, 17%)",
        Dark_Gray: "hsl(0, 0%, 59%)",
      },
    },
    backgroundImage: {
      desktopBG: "url('../images/pattern-bg-desktop.png')",
    },
  },
  plugins: [],
};
