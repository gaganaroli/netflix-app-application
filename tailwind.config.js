/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        netflix: {
          red: '#E50914',
          black: '#141414',
          darkGray: '#232323',
          lightGray: '#333333',
        }
      },
      backgroundImage: {
        'netflix-hero': "linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.8) 100%), url('https://assets.nflxext.com/ffe/siteui/vlv3/f8ca36a4-ac20-4af2-913b-3d8517191302/6470081d-91b5-4740-9856-bb617e4f20bf/IN-en-20250210-TRIFECTA-perspective_75ca995d-42bc-414c-9d7a-11333e60156d_large.jpg')",
      }
    },
  },
  plugins: [],
}
