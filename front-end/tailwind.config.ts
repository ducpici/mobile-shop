/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}", // shadcn components
    "./node_modules/@shadcn/ui/dist/**/*.{js,ts,jsx,tsx}", // nếu cài qua node_modules
  ],
  theme: {
    extend: {
      boxShadow: {
        // Shadow mặc định Tailwind chỉ đổ xuống (bottom)
        // Custom thêm shadow đều cả 4 cạnh
        around: "0 0 15px rgba(0,0,0,0.2)",

        // Shadow theo từng cạnh
        top: "0 -4px 6px -1px rgba(0,0,0,0.1)",
        right: "4px 0 6px -1px rgba(0,0,0,0.1)",
        bottom: "0 4px 6px -1px rgba(0,0,0,0.1)",
        left: "-4px 0 6px -1px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
};
