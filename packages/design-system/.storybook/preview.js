import '../src/styles/output.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  backgrounds: {
    default: 'myria',
    values: [
      {
        name: 'myria',
        value: '#040B10'
      },
      {
        name: 'white',
        value: '#fff'
      }
    ]
  }
};
