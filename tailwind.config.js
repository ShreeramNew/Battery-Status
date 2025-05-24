/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./src/**/*.{js,jsx,ts,tsx}"],
   theme: {
      extend: {
         screens: {
            ipadMini: { min: "1024px", max: "1180px" },
            "ipad-air": { min: "1024px", max: "1400px" }, // Custom breakpoint for iPad Air
            "ipad-pro": { min: "1366px", max: "1400px" }, // Custom breakpoint for iPad Air
            "ipad-air-portrait": { min: "768px", max: "1020px" }, // Custom breakpoint for iPad Air
         },
      },
   },
   plugins: [],
};
