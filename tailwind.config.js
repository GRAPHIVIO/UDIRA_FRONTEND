/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef4f3",
          100: "#dbe9e7",
          200: "#b8d2cf",
          300: "#94bbb7",
          400: "#4d8d85",
          500: "#2f6660",
          600: "#2a5c56",
          700: "#234d48",
          800: "#1c3d3a",
          900: "#17322f",
        },
        gray: {
          50: "#f7f7f6",
          100: "#efefee",
          200: "#dfdedc",
          300: "#cfceca",
          400: "#bfbeba",
          500: "#acaba7",
          600: "#9b9a96",
          700: "#81807d",
          800: "#676664",
          900: "#565553",
        },
        dark: {
          50: "#f4f6f6",
          100: "#e9edec",
          200: "#c8d2d1",
          300: "#a7b7b6",
          400: "#65817f",
          500: "#234b4a",
          600: "#204443",
          700: "#1a3938",
          800: "#152d2d",
          900: "#112524",
        },
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      },
      borderRadius: {
        lg: "0.5rem",
        xl: "0.75rem",
      },
    },
  },
  plugins: [],
}
