import { configure, addDecorator } from "@storybook/react";
import { checkA11y } from "@storybook/addon-a11y";
import { withInfo } from "@storybook/addon-info";
import { withKnobs } from "@storybook/addon-knobs";
import "storybook-chromatic";

// By convention, automatically load all .stories.js files in src/components in Storybook
// More: https://storybook.js.org/basics/writing-stories/#loading-stories-dynamically
const req = require.context("../src/components", true, /\.stories\.js$/);

function loadStories() {
  req
    .keys()
    // Sort by filename. Ignore path and filename casing. This assures the component list is displayed alphabetically in Storybook's navigation.
    .sort(function(a, b) {
      const filenameA = a.replace(/^.*[\\\/]/, "").toLowerCase();
      const filenameB = b.replace(/^.*[\\\/]/, "").toLowerCase();
      if (filenameA < filenameB) return -1;
      if (filenameA > filenameB) return 1;
      return 0;
    })
    .forEach(filename => req(filename));
}

// Globally enable addons
addDecorator(checkA11y);
addDecorator(withInfo);
addDecorator(withKnobs);

configure(loadStories, module);
