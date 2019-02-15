import React from "react";
import PropTypes from "prop-types";
import styles from "./Tooltip.module.scss";

/** Reusable Tooltip for displaying validation errors */
const Tooltip = ({ tip }) => {
  return <div className={styles.tooltip}>{tip}</div>;
};

Tooltip.propTypes = {
  /** Message to display */
  tip: PropTypes.string.isRequired
};

export default Tooltip;
