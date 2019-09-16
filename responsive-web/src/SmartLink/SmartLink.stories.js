import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import SmartLink from "./SmartLink";
import { storiesOf } from "@storybook/react";
import "../scss/global.scss";

storiesOf("Links/SmartLink", module)
  .add("Absolute URL", () => (
    <SmartLink to="http://microsoft.com">http://microsoft.com</SmartLink>
  ))
  .add("Relative URL", () => (
    <Router>
      <p>
        <SmartLink to="/accounts">/accounts</SmartLink>
        <br />
        This relative URL won&apos;t load in Storybook since there is no
        matching route configured. In a real app, this will render as a
        &lt;Link&gt; so React Router will handle it.
      </p>
    </Router>
  ))
  .add("Anchor URL", () => (
    <Router>
      <SmartLink to="#faq">#faq</SmartLink>
    </Router>
  ));
