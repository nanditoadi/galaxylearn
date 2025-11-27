/** @type {import('tailwindcss').Config} */
const config = {
  content: [
  './src/pages/**/*.{js,ts,jsx,tsx,mdx}',     // <-- TAMBAHKAN 'src/'
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',       // <-- TAMBAHKAN 'src/'
    './src/components/**/*.{js,ts,jsx,tsx,mdx}', // <-- TAMBAHKAN 'src/'// Ini akan membaca file ProfilePage.tsx Anda
  ],
  theme: {
    extend: {
      // Anda bisa memindahkan variabel :root dari globals.css ke sini
    },
  },
  plugins: [],
};
export default config;
