import type {Config} from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#09090b',
        surface: {
          DEFAULT: '#111114',
          subtle: '#16161a',
          hover: '#1c1c22',
        },
        border: {
          DEFAULT: '#222228',
          subtle: '#1a1a20',
          focus: '#3f3f4e',
        },
        text: {
          primary: '#f5f3ef',
          secondary: '#9e9b94',
          muted: '#66645e',
        },
        accent: {
          DEFAULT: '#d4af37',
          hover: '#e2be4a',
          muted: 'rgba(212, 175, 55, 0.15)',
          border: 'rgba(212, 175, 55, 0.3)',
        },
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      animation: {
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}

export default config
