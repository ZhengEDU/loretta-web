/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#0d0a0d",
        "off-white": "#f6e9ef",
        blush: "#2a1420",
        "dusty-pink": "#ff5c93",
        lavender: "#241a33",
        "muted-burgundy": "#ff2d75",
        "warm-brown": "#ff6fa5",
        ink: "#120e13",
        noir: "#18141a",
      },
      fontFamily: {
        hand: ["Caveat", "cursive"],
        serif: ["Playfair Display", "serif"],
        body: ["Quicksand", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px -10px rgba(255, 45, 117, 0.35)",
        paper: "0 2px 6px rgba(0,0,0,0.35), 0 8px 20px -6px rgba(255,45,117,0.12)",
        glow: "0 0 24px rgba(255, 45, 117, 0.55), 0 0 60px rgba(255, 45, 117, 0.2)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        twinkle: {
          "0%, 100%": { opacity: 0.3, transform: "scale(0.9)" },
          "50%": { opacity: 1, transform: "scale(1.1)" },
        },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        twinkle: "twinkle 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
