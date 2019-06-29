import { configure, addDecorator } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import { withInfo } from "@storybook/addon-info";
import { withKnobs } from "@storybook/addon-knobs";
import "storybook-chromatic";

const req = require.context("../src/components", true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

// Globally enable addons
addDecorator(withA11y);
addDecorator(withInfo);
addDecorator(withKnobs);

configure(loadStories, module);
