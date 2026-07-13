/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand core — Revolv3 Brand Guidelines Vol.1
        skylla: {
          DEFAULT: '#2486B9',
          50: '#EAF4FA',
          100: '#CDE7F4',
          200: '#A6D4EC',
          300: '#6FB6DB',
          400: '#429DC7',
          500: '#2486B9',
          600: '#1E729E',
          700: '#185C80',
          800: '#164A66',
          900: '#123B52',
        },
        pool: {
          DEFAULT: '#60C1EE',
          100: '#D6F0FB',
          300: '#9BD9F4',
          500: '#60C1EE',
          700: '#2E9BD0',
        },
        nile: {
          DEFAULT: '#1A3E50',
          950: '#0C2632',
          900: '#102E3D',
          800: '#1A3E50',
          700: '#274F63',
          600: '#3A6076',
        },
        lily: '#E4F5FD',
        lambo: '#FFDB63',
        ink: {
          50: '#F6F9FB',
          100: '#EDF2F6',
          200: '#DEE6EC',
          300: '#C6D2DB',
          400: '#9CACB8',
          500: '#6E7F8C',
          600: '#4F5F6B',
          700: '#37454F',
          800: '#24303A',
          900: '#141E26',
        },
      },
      fontFamily: {
        sans: [
          'Open Sauce Sans',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      fontSize: {
        'display-2xl': ['clamp(2.75rem, 6vw, 4.75rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        'display-xl': ['clamp(2.25rem, 4.5vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        'display-lg': ['clamp(1.875rem, 3.5vw, 2.75rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
      letterSpacing: {
        tightest: '-0.03em',
        overline: '0.14em',
      },
      maxWidth: {
        container: '1200px',
        prose: '68ch',
      },
      borderRadius: {
        xl: '16px',
        '2xl': '24px',
      },
      boxShadow: {
        xs: '0 1px 2px rgba(16,46,61,0.06)',
        sm: '0 1px 3px rgba(16,46,61,0.08), 0 1px 2px rgba(16,46,61,0.06)',
        md: '0 4px 12px rgba(16,46,61,0.10), 0 2px 4px rgba(16,46,61,0.06)',
        lg: '0 12px 28px rgba(16,46,61,0.14), 0 4px 8px rgba(16,46,61,0.08)',
        xl: '0 24px 48px rgba(16,46,61,0.18)',
        primary: '0 8px 24px rgba(36,134,185,0.30)',
        glow: '0 0 60px rgba(96,193,238,0.35)',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(120deg, #2486B9 0%, #60C1EE 100%)',
        'gradient-brand-deep': 'linear-gradient(135deg, #1A3E50 0%, rgba(36,80,102,0.5) 40%, #2486B9 100%)',
        'gradient-nile': 'linear-gradient(160deg, #1A3E50 0%, #0C2632 100%)',
        'gradient-sky-wash': 'linear-gradient(180deg, #E4F5FD 0%, #FFFFFF 100%)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
        standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.5' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'marquee-slow': 'marquee 60s linear infinite',
        'pulse-ring': 'pulse-ring 3s cubic-bezier(0.16,1,0.3,1) infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
