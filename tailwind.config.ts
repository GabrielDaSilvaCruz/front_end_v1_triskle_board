import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("daisyui"), require('tailwind-scrollbar')],
  daisyui: {
    themes: [
      "light",
      "dark",
      {
        winoLight: {
          "primary": "#21BDC6",
          "secondary": "#B4318F",
          "accent": "#37cdbe",
          "neutral": "#3d4451",
          "base-100": "#F4F5F8",
        },
        winoDark: {
          "primary": "#21BDC6",
          "secondary": "#B4318F",
          "accent": "#37cdbe",
          "neutral": "#3d4451",
          "base-100": "#15191D",
        }
      },
    ],
    darkTheme: "dark",
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  },
}
export default config
