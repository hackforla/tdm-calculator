import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import { MdOutlineSearch } from "react-icons/md";

const useStyles = createUseStyles({
  wrapper: {
    position: "relative"
  },
  input: {
    boxSizing: "border-box",
    maxWidth: "100%",
    width: ({ width }) => width,
    minWidth: ({ minWidth }) => minWidth,
    padding: "12px 12px 12px 48px"
  },
  icon: {
    position: "absolute",
    left: "14px",
    top: "10px",
    height: "28px",
    width: "28px"
  }
});

const TableSearchField = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  width,
  minWidth,
  className,
  dataTestId
}) => {
  const classes = useStyles({ width, minWidth });

  return (
    <div
      className={
        className ? `${classes.wrapper} ${className}` : classes.wrapper
      }
    >
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        className={classes.input}
        type="search"
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        data-testid={dataTestId}
      />
      <MdOutlineSearch
        className={classes.icon}
        aria-hidden="true"
        focusable="false"
      />
    </div>
  );
};

TableSearchField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
  minWidth: PropTypes.string,
  className: PropTypes.string,
  dataTestId: PropTypes.string
};

export default TableSearchField;
