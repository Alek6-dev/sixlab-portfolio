import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Palette centrale du portfolio.
        // Pour changer un ton global, modifier ces tokens puis garder les classes
        // semantiques dans les composants : brand, canvas, panel, line, copy, status.
        sand: {
          50:  '#eee8dc',
          100: '#ded8c8',
          200: '#c4baa8',
          300: '#a09080',
          400: '#746860',
          500: '#565048',
          600: '#443e38',
          700: '#343028',
          800: '#2a2620',
          900: '#211f1c',
          950: '#1a1814',
        },
        canvas: {
          DEFAULT: '#0d1014',
          soft: '#101318',
        },
        panel: {
          DEFAULT: '#15191f',
          soft: '#1a1f26',
          muted: '#222730',
          inverse: '#f7f4ee',
          'inverse-muted': '#ebe7df',
        },
        line: {
          DEFAULT: '#2d333c',
          soft: '#3a404a',
          warm: '#6f5737',
        },
        copy: {
          DEFAULT: '#f4efe7',
          muted: '#b9b0a5',
          faint: '#81786e',
          inverse: '#111111',
        },
        brand: {
          50: '#fff6e8',
          100: '#ffe8c4',
          200: '#ffd28a',
          300: '#f6b66d',
          400: '#ee9b55',
          500: '#d87a3f',
          600: '#b95f33',
          700: '#8f472a',
          800: '#633121',
          900: '#3a2118',
        },
        status: {
          live: {
            bg: '#17351f',
            border: '#2f6a3c',
            text: '#8fd49a',
          },
          progress: {
            bg: '#3a2a18',
            border: '#8b6334',
            text: '#ffd28a',
          },
          experiment: {
            bg: '#182a3a',
            border: '#345e85',
            text: '#9cc8ec',
          },
          archived: {
            bg: '#2a2620',
            border: '#343028',
            text: '#a09080',
          },
          danger: {
            bg: '#ffe5d9',
            text: '#bf5838',
          },
        },
        project: {
          app: '#ee9b55',
          saas: '#6f5cff',
          workflow: '#8fd49a',
          site: '#f6b66d',
        },
      },
    },
  },
  plugins: [],
}

export default config
