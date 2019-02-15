import React from "react";
import PropTypes from "prop-types";
import "./CheckboxList.css";

const CheckboxList = ({ options, label, onChange, selectAll, selectNone }) => {
  return (
    <>
      <label className="filter-label">{label}</label>
      <div className="checkboxlist-wrapper">
        <div>
          <button className="link-button" onClick={selectAll}>
            All
          </button>{" "}
          <button className="link-button" onClick={selectNone}>
            None
          </button>
        </div>
        <div className="checkboxlist-options-wrapper">
          {label === "Dispatch Class" && (
            <>
              Show
              <div className="checkboxlist-count-wrapper">Count</div>
            </>
          )}
          {options.map(option => (
            <div key={option.value}>
              <input
                type="checkbox"
                id={option.value}
                name={option.value}
                value={option.value}
                onChange={() => onChange(option)}
                checked={option.checked}
              />
              <label htmlFor={option.value}>{option.label}</label>
              {option.count && (
                <div className="checkboxlist-count-wrapper">{option.count}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

CheckboxList.propTypes = {
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

export default CheckboxList;
