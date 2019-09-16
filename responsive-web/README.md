This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Modifications to create-react-app

1. Add Storybook: `npx -p @storybook/cli sb init --type react`
1. Add addons to Storybook: `npm i -D @storybook/addon-viewport @storybook/addon-knobs`, then add these lines to .storybook/addons.js: `import '@storybook/addon-viewport/register';`
1. Configure storybook to find stories in src by changing .storybook/config.js to this: `const req = require.context('../src', true, /\.stories\.js$/);`
   )
1. Install @testing-library/react: `npm i -D @testing-library/react`
1. Install Cypress: `npm i -D cypress`
1. Install @testing-library/cypress : `npm i -D @testing-library/cypress`
1. Install react-router-dom: `npm i -D react-router-dom`

Exercises:

1. [Menu using grid, state machine, and Emotion](https://codesandbox.io/s/state-machines-in-react-2llje)
1. [Responsive table](https://stackblitz.com/edit/mobile-table?file=style.css) - [Mobile table approaches](https://medium.com/appnroll-publication/5-practical-solutions-to-make-responsive-data-tables-ff031c48b122)
1. [Calendar using Flexbox](https://codepen.io/ljm/pen/JjfAv) [Blog](https://thoughtbot.com/blog/flexboxes-media-queries-awesome-layouts)
1. [Toy with Flexplorer](https://bennettfeely.com/flexplorer/) (move to tools)
