import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Nav from "./Nav";
import NavItem from "./Nav";
import { render, cleanup } from "@testing-library/react";

afterEach(cleanup);

const renderNav = (screenWidth = 975) =>
  render(
    <Router>
      <Nav activeIndex={1} flyoutId="Nav1" screenWidth={screenWidth}>
        {/* Note, have to pass screenWidth to these even though not used due to some bug with propType validation. Otherwise, will get a propType warning. */}
        <NavItem screenWidth={screenWidth} to="#a">
          Make a Bill Payment
        </NavItem>
        <NavItem screenWidth={screenWidth} to="#b">
          Repeating Payments
        </NavItem>
        <NavItem screenWidth={screenWidth} to="#c">
          Payment Activity
        </NavItem>
        <NavItem screenWidth={screenWidth} to="#d">
          Manage Payees
        </NavItem>
        <NavItem screenWidth={screenWidth} to="#e">
          Manage eBills
        </NavItem>
      </Nav>
    </Router>
  );

it("should display nav items as list elements", () => {
  renderNav();
  expect(document.querySelectorAll("li").length).toBe(5);
});

it("should display a url for each nav item", () => {
  renderNav();
  expect(document.querySelectorAll("li a").length).toBe(5);
});

it("should display text passed as child", () => {
  const { getByText } = renderNav();
  getByText("Make a Bill Payment");
});
