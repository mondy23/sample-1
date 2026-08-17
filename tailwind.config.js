export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        pharm: {
          50: '#F3F8F1',
          100: '#E2EEDE',
          200: '#C3DBBA',
          300: '#98C08B',
          400: '#68A257',
          500: '#3C7A32',
          600: '#316829',
          700: '#275221',
          800: '#1E3F1A',
          900: '#152C12',
        },
        gold: {
          50: '#FEFDF0',
          100: '#FCF8D6',
          200: '#F8F09B',
          300: '#F3E86A',
          400: '#EEE244',
          500: '#DCCE20',
          600: '#AC9F14',
          700: '#7C720E',
        },
        ink: {
          50: '#F7F8F7',
          100: '#EDEFEC',
          200: '#DFE2DD',
          300: '#C2C7BF',
          400: '#8E958B',
          500: '#666D63',
          600: '#4B5148',
          700: '#373C35',
          800: '#242821',
          900: '#141712',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        '2xs': ['11px', '14px'],
        xs: ['12px', '16px'],
        sm: ['13px', '18px'],
      },
      boxShadow: {
        panel: '0 1px 2px rgba(20, 23, 18, 0.06)',
      },
    },
  },
  plugins: [],
}
