/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Point Color (Brand Blue)
        pc: {
          100: '#ECF1F9',
          200: '#CCE2FF',
          300: '#B8D7FF',
          400: '#8FBFFF',
          500: '#6BABFF',
          600: '#57A0FF',
          700: '#3D91FF',
          800: '#0A74FF', // ★ Primary Brand Color
          900: '#0056C7',
          1000: '#1E4B85',
        },
        // Basic Color (Neutral Gray)
        bc: {
          100: '#E8EBF2',
          200: '#D2D6E0',
          300: '#C6CCD7',
          400: '#B1B7C4',
          500: '#A1A7B5',
          600: '#8F96A3',
          700: '#747A86',
          800: '#51555D',
          900: '#3D4148',
          1000: '#17191C', // ★ Primary Text
        },
        // On Surface (Background Layers)
        lb: {
          100: '#FCFCFD',
          200: '#F9FAFB',
          300: '#EEF1F6',
        },
        db: {
          100: '#393C41',
          200: '#26282C',
        },
        pb: {
          150: '#A0A9BA',
        },
        // Theme Colors
        error: {
          DEFAULT: '#EF5D5D',
          bg: '#FEE1E1',
          dark: '#D84141',
        },
        confirm: {
          DEFAULT: '#00ABF5',
          bg: '#E5F8FF',
          light: '#2EC7FF',
        },
        warning: {
          DEFAULT: '#FFBB00',
          bg: '#FFF2D1',
          dark: '#DD7F13',
        },
        success: {
          DEFAULT: '#26A138',
          bg: '#E0FAE9',
          light: '#59E387',
        },
        // Legend & Tag Colors
        purple: {
          100: '#F7F0FF',
          200: '#9747FF',
          300: '#6C10E5',
        },
        tag: {
          blue: {
            100: '#EBEFFF',
            200: '#4D76FF',
            300: '#214BD4',
          },
          pink: {
            100: '#FCD9EE',
            200: '#EF4EAE',
            300: '#C20F7B',
          },
        },
      },

      fontFamily: {
        sans: ['Noto Sans KR', 'Noto Sans', 'sans-serif'],
      },

      fontSize: {
        '11': ['11px', { lineHeight: '18px', letterSpacing: '-0.26px' }],
        '12': ['12px', { lineHeight: '18px', letterSpacing: '-0.26px' }],
        '14': ['14px', { lineHeight: '22px', letterSpacing: '-0.3px' }],
        '16': ['16px', { lineHeight: '24px', letterSpacing: '-0.35px' }],
        '18': ['18px', { lineHeight: '28px', letterSpacing: '-0.4px' }],
        '20': ['20px', { lineHeight: '30px', letterSpacing: '-0.43px' }],
        '24': ['24px', { lineHeight: '36px', letterSpacing: '-0.43px' }],
        '28': ['28px', { lineHeight: '42px', letterSpacing: '-0.43px' }],
        '32': ['32px', { lineHeight: '48px', letterSpacing: '-0.45px' }],
        '36': ['36px', { lineHeight: '54px', letterSpacing: '-0.45px' }],
        '42': ['42px', { lineHeight: '64px', letterSpacing: '-0.5px' }],
        '48': ['48px', { lineHeight: '72px', letterSpacing: '-0.5px' }],
        '54': ['54px', { lineHeight: '82px', letterSpacing: '-0.5px' }],
      },

      letterSpacing: {
        'tight-xs':  '-0.26px',
        'tight-sm':  '-0.3px',
        'tight-md':  '-0.35px',
        'tight-lg':  '-0.4px',
        'tight-xl':  '-0.43px',
        'tight-2xl': '-0.45px',
        'tight-3xl': '-0.5px',
        // 36px medium 예외값
        'tight-36m': '-1.26px',
      },

      borderRadius: {
        '3': '3px',
        '4': '4px',
        '5': '5px',
      },

      boxShadow: {
        dropdown: '0px 2px 5px 0px rgba(0,0,0,0.12)',
      },

      height: {
        '28': '28px',
        '32': '32px',
        '40': '40px',
        '48': '48px',
        '56': '56px',
        '72': '72px',
      },
    },
  },
  plugins: [],
}
