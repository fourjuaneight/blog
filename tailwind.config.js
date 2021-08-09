const pallete = {
  background: 'var(--background)',
  'background-dark': 'var(--background-dark)',
  foreground: 'var(--foreground)',
  meta: 'var(--meta)',
  primary: 'var(--primary)',
  selection: 'var(--selection)',
  secondary: 'var(--secondary)',
  tertiary: 'var(--tertiary)',
};

module.exports = {
  purge: {
    enabled: true,
    content: ['./index.html', './src/**/*.vue'],
  },
  darkMode: 'media',
  theme: {
    extend: {
      borderColor: pallete,
      colors: pallete,
      fill: pallete,
      stroke: pallete,
    },
    fontFamily: {
      captainEdward: ['Captain Edward', 'serif'],
      shipsWhistle: ['Ships Whistle', 'sans-serif'],
      dankMono: ['Dank Mono', 'monospace'],
    },
    zIndex: {
      hidden: -1,
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      10: 10,
      20: 20,
      25: 25,
      30: 30,
      40: 40,
      50: 50,
      75: 75,
      100: 100,
      auto: 'auto',
    },
  },
};
