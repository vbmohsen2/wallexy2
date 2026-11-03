module.exports = {
  screens: {
    'xs': '500px',
    'sm': '640px',
    'md': '768px',
    'lg': '1024px',
    'xl': '1200px',
  },
  fontFamily: {
    x: ['x', 'sans-serif'],
    mono: ['monospace', 'sans-serif'],
  },
  fontSize: {
    'xs': '0.675rem',
    'sm': '0.775rem',
    'base': '0.825rem',
    'md': '0.9rem',
    'lg': '1.1rem',
    'xl': '1.3rem',
    '2xl': '1.5rem',
    '3xl': '1.7rem',
    '4xl': '2rem',
  },
  borderRadius: {
    'none': '0rem',
    'sm': '0.5rem',
    'md': '0.7rem',
    'lg': '0.85rem',
    'xl': '0.95rem',
    'full': '100rem',
  },
  boxShadow: {
    sm: '0 0 5px 0 #e6e6e6',
    md: '0 0 8px 0 #e6e6e6',
    lg: '0 0 10px 0 #f2f2f2',
    x: '0 0 20px 0 #d9d9d9'
  },
  extend: {
    animation: {
      wiggle: 'wiggle 1s ease-in-out infinite',
      percent: 'percent 0.5s ease-in-out infinite',
      scale: 'scale 0.15s cubic-bezier(.25,.8,.25,1)',
    },
    keyframes: {
      wiggle: {
        '0%, 100%': {transform: 'rotate(-3deg)'},
        '50%': {transform: 'rotate(3deg)'},
      },
      percent: {
        '0% ,10% ,90% , 100%': {opacity: '0'},
        '30%, 70%': {opacity: '1'},
      },
      scale: {
        '50%': {transform: 'translate(-50%,-50%) scale(1.03)' , top: '50%', left: '50%'},
        '0%, 100%': {transform: 'translate(-50%,-50%) scale(1)', top: '50%', left: '50%'},
      },
    }
  }
}
