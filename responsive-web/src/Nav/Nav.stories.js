/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Nav, { NavItem } from "./Nav";
import { storiesOf } from "@storybook/react";
import "../scss/global.scss";
import useWindowSize from "../hooks/useWindowSize";
import { number } from "@storybook/addon-knobs";

function NavWrapper() {
  const { w } = useWindowSize(100);

  return (
    <Router>
      <Nav
        activeIndex={number("activeIndex", 1)}
        flyoutId="Nav0"
        screenWidth={w}
      >
        <NavItem>Make a Bill Payment</NavItem>
        <NavItem to="/repeating-payments">Repeating Payments</NavItem>
        <NavItem to="http://cnet.com">Payment Activity</NavItem>
        <NavItem to="/manage-payees">Manage Payees</NavItem>
        <NavItem to="#e">Manage eBills</NavItem>
      </Nav>
    </Router>
  );
}

storiesOf("Nav", module)
  .addDecorator(storyFn => <main>{storyFn()}</main>)
  .add("Responsive", () => <NavWrapper />)
  .addParameters({ viewport: { defaultViewport: "iphone6" } })
  .add("Mobile", () => {
    return (
      <Router>
        <Nav
          activeIndex={number("activeIndex", 0)}
          flyoutId="Nav0"
          screenWidth={375}
        >
          <NavItem to="#a">Make a Bill Payment</NavItem>
          <NavItem to="#b">Repeating Payments</NavItem>
          <NavItem to="http://cnet.com">Payment Activity</NavItem>
          <NavItem to="#d">Manage Payees</NavItem>
          <NavItem to="#e">Manage eBills</NavItem>
        </Nav>
      </Router>
    );
  });
