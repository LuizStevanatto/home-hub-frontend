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
        brand4: "#EDEAFD",
        brand3: "#B0A6F0",
        brand2: "#5126EA",
        brand1: "#4529E6",

        gray0: "#0B0D0D",
        gray1: "#212529",
        gray2: "#495057",
        gray3: "#868E96",
        gray4: "#ADB5BD",
        gray5: "#CED4DA",
        gray6: "#DEE2E6",
        gray7: "#E9ECEF",
        gray8: "#F1F3F5",
        gray9: "#F8F9FA",
        gray10: "#FDFDFD",

        alert1: "#CD2B31",
        alert2: "#FDD8D8",
        alert3: "#FFE5E5",

        sucess1: "#18794E",
        sucess2: "#CCEBD7",
        sucess3: "#DDF3E4",

        "green-wpp": "#40C057",
      },
    },
  },
  plugins: [],
};
