import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isExternal from "is-url-external";

/** Render a plain anchor for absolute links and anchor tags, and a React Router <Link> otherwise.  React Router's Link doesn't support external links: https://github.com/ReactTraining/react-router/issues/1147 */
const SmartLink = ({ to, className, children }) => {
  return isExternal(to) ? (
    <a className={className} href={to}>
      {children}
    </a>
  ) : (
    <Link className={className} to={to}>
      {children}
    </Link>
  );
};

SmartLink.propTypes = {
  /** Link text */
  children: PropTypes.any.isRequired,

  /** CSS classname applied to link */
  className: PropTypes.string,

  /** Link URL */
  to: PropTypes.string.isRequired
};

export default SmartLink;
