/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5c5757",
        darkBlueColor: "#218287",
        lightBlueColor: "#80b4b6",
        redColor: "#d45a57",
        vtrendyTextColor: "#5c5757",
        hoverBlueColor: "#25949a",
        tableTitle: "#f3f3f3",
      },
    },
  },
  plugins: [],
};
