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
        primary: "#1E40AF",       // blue for buttons/links
        secondary: "#FBBF24",     // yellow accent
        bg: "#F3F4F6",            // main background
        card: "#FFFFFF",           // card background
        textPrimary: "#111827",   // dark text
        textSecondary: "#6B7280", // gray text
        danger: "#DC2626",        // for unfollow/delete
        success: "#16A34A",       // green accents
      },
    },
  },
  plugins: [],
};
