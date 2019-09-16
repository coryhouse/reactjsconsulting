/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Table from "./Table";
import { storiesOf } from "@storybook/react";

storiesOf("Table", module)
  .addDecorator(storyFn => <main>{storyFn()}</main>)
  .add("Web", () => <Table />)
  .addParameters({ viewport: { defaultViewport: "iphone6" } })
  .add("Mobile", () => {
    return <Table></Table>;
  });
