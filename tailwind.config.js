/**
 * Tailwind CSS Configuration - Stormlight Archive Theme
 */

export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        // Storm color palette
        'storm-deep': '#1a2a4a',
        'storm-blue': '#2c4a7c',
        'storm-radiant': '#00d4ff',
        'storm-light': '#4a9eff',
        'legal-zone': '#2d7d2d',
        'exclusion-zone': '#c4453d',
        'warning-amber': '#f59e0b',
        'info-gray': '#6b7280',
      },
      fontFamily: {
        'storm': ['Georgia', 'serif'],
      },
      backgroundImage: {
        'storm-pattern': "radial-gradient(circle at 20% 50%, rgba(0, 212, 255, 0.1) 0%, transparent 50%)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};