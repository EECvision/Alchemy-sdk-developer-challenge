import { useState } from "react";
import classes from "./Button.module.css";

const Button = ({
  children,
  color = "default",
  size = "auto",
  disabled,
  override,
}) => {
  const [click, setClick] = useState(false);

  const isOverride = (override) => {
    return !override
      ? `${classes[color]} ${classes[size]} ${click && classes.click} ${
          disabled && classes.disabled
        }`
      : "";
  };

  return (
    <div
      onMouseDown={() => setClick(true)}
      onMouseUp={() => setClick(false)}
      className={`${classes.button} ${isOverride(override)}`}
    >
      {children}
      <div className={classes.overlay}></div>
    </div>
  );
};

export default Button;
