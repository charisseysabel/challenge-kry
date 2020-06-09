import className from "classnames";
import React from "react";
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
  onClick?: any;
};
const Button = ({ children, type, onClick, kind }: ButtonProps) => {
  return (
    <button
      type={type}
      className={className(styles.button, {
        [styles.primary]: kind === "PRIMARY",
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: "button",
  kind: "DEFAULT",
};

export default Button;
