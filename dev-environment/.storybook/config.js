import { configure, addDecorator, addParameters } from "@storybook/react";
import { checkA11y } from "@storybook/addon-a11y";
import { withInfo } from "@storybook/addon-info";
import { withKnobs } from "@storybook/addon-knobs";
import "storybook-chromatic";

const req = require.context("../src/components", true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

// Globally enable addons
addDecorator(checkA11y);
addDecorator(withInfo);
addDecorator(withKnobs);

// Enable dark mode
addParameters({
  options: {
    theme: themes.dark
  }
});

configure(loadStories, module);
