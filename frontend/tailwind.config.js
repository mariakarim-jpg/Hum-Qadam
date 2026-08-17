/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // plan/14 Dashboard UI Principles: "Color coding: Green (on track) |
        // Amber (attention) | Red (urgent)" — named so status colors read as
        // intent in markup, e.g. bg-status-flagged, not a raw hex/tailwind shade.
        status: {
          onTrack: '#16a34a',
          attention: '#d97706',
          flagged: '#dc2626',
        },
      },
    },
  },
  plugins: [],
};
