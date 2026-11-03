const theme = require('./tailwind.theme');

module.exports = {
  content: [
    './pages/**/*.vue',
    './resources/**/*.{edge,vue}',
  ],
  safelist: [
    {
      pattern: /^w/ ,
      variants: ['sm', 'md', 'lg' , 'xl'],
    },
  ],
  theme,
  plugins: [],
}
