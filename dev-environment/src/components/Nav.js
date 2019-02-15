import React from "react";
import { Link } from "@reach/router";

const Nav = () => (
  <nav>
    <Link to="/">Home</Link> | <Link to="/about">About</Link> |{" "}
    <Link to="/contact">Contact</Link>
  </nav>
);

export default Nav;
