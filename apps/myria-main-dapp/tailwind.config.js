const base = require('design-system/tailwind.config.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [base],
  content: ['./src/**/*.{js,ts,jsx,tsx}', '../../packages/design-system/dist/**/*.js']
};
