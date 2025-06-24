// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // This tells Tailwind which files to scan for classes to include in your CSS
    "./index.html", // Your main HTML file
    "./src/**/*.{js,jsx,ts,tsx}", // All JS/JSX/TS/TSX files in src/
  ],
  theme: {
    extend: {
      fontFamily: {
        // Add your custom font families here
        // The key 'satoshi' will be the utility class you use (e.g., 'font-satoshi')
        // The value should be an array:
        // - First item: The exact font-family name you used in @font-face (e.g., 'Satoshi')
        // - Second item (optional but recommended): A generic fallback font
        satoshi: ['Satoshi', 'sans-serif'],
      }
    },
  },
  plugins: [],
}