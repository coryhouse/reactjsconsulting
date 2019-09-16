/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { storiesOf } from "@storybook/react";
import "../scss/global.scss";
import "./FlexboxPlayground.css";
import FlexboxPlayground from "./FlexboxPlayground";

storiesOf("FlexboxPlayground", module).add("Boxes", () => {
  return <FlexboxPlayground />;
});
