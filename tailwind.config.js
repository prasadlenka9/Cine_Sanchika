import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF",
        secondary: "#FBBF24",
        bg: "#F3F4F6",
        card: "#FFFFFF",
        textPrimary: "#111827",
        textSecondary: "#6B7280",
        danger: "#DC2626",
        success: "#16A34A",
      },
      fontFamily: {
        letterboxd: ['Letterboxd', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
