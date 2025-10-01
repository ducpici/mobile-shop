/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}", // shadcn components
    "./node_modules/@shadcn/ui/dist/**/*.{js,ts,jsx,tsx}", // nếu cài qua node_modules
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
