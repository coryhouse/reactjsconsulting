/* eslint-disable jsx-a11y/label-has-for */
import React, { useState } from "react";
import PropTypes from "prop-types";
import Tooltip from "../Tooltip";
import styles from "./TextInput.module.scss";

/** Reusable Text Input with integrated label, error, and required field validation */
const TextInput = ({
  id,
  label,
  type,
  value,
  error,
  maxLength,
  required,
  onBlur,
  onChange
}) => {
  const [localError, setLocalError] = useState("");

  function handleBlur(event) {
    setLocalError(required && !value ? "Required." : "");
    if (onBlur) onBlur(event);
  }

  const hasError = error || localError;

  return (
    <>
      <label className={styles.label} htmlFor={id}>
        {label} {required && "*"}
      </label>
      <input
        type={type}
        value={value}
        required={required}
        maxLength={maxLength}
        className={styles.input + (hasError && " " + styles.error)}
        id={id}
        onBlur={handleBlur}
        onChange={onChange}
      />
      {localError && <Tooltip tip={localError} />}
    </>
  );
};

TextInput.propTypes = {
  /** Input ID */
  id: PropTypes.string.isRequired,

  /** Input label */
  label: PropTypes.string.isRequired,

  /** Input type */
  type: PropTypes.oneOf(["text", "email", "number"]).isRequired,

  /** Input value */
  value: PropTypes.string.isRequired,

  /** Function called onBlur */
  onBlur: PropTypes.func,

  /** Function called onChange */
  onChange: PropTypes.func.isRequired,

  /** Input max length */
  maxLength: PropTypes.number,

  /** Set to true to enable required field validation on blur */
  required: PropTypes.bool,

  /** Set error state and display below the input */
  error: PropTypes.string
};

TextInput.defaultProps = {
  required: false,
  error: "",
  type: "text"
};

export default TextInput;
