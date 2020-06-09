import React from "react";
import className from "classnames";
import styles from "./styles.module.css";

export const ButtonContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className={styles.buttonContainer}>{children}</div>;
};

type ButtonProps = {
  children: React.ReactNode;
  type: "button" | "submit" | "reset";
  disabled: boolean;
};
const Button = ({ children, type, disabled }: ButtonProps) => {
  return (
    <button
      type={type}
      className={className(styles.button, { [styles.disabled]: disabled })}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: "button",
  disabled: false,
};

export default Button;
