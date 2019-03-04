import React from "react";
import { Link } from "@reach/router";

const Nav = () => (
  <nav>
    <Link to="/">Home</Link> | <Link to="/about">About</Link>
  </nav>
);

export default Nav;
