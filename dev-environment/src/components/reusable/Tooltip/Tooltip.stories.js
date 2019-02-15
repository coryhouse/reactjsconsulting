import React from "react";
import { storiesOf } from "@storybook/react";
import Tooltip from "./Tooltip";
import { text } from "@storybook/addon-knobs";

storiesOf("Tooltip", module).add("Default", () => (
  <Tooltip tip={text("tip", "tip")} />
));
