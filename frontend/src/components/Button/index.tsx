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
  kind: "DEFAULT" | "PRIMARY";
  disabled: boolean;
  onClick?: any;
};
const Button = ({ children, type, disabled, onClick, kind }: ButtonProps) => {
  return (
    <button
      type={type}
      className={className(styles.button, styles.default, {
        [styles.disabled]: disabled,
        [styles.primary]: kind === "PRIMARY",
      })}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: "button",
  disabled: false,
  kind: "DEFAULT",
};

export default Button;
