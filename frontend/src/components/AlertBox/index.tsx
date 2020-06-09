import className from "classnames";
import React from "react";
import styles from "./styles.module.css";

type AlertBox = {
  message?: string;
  type: "ERROR" | "SUCCESS";
  children?: React.ReactNode;
};

const AlertBox = ({ message, type, children }: AlertBox) => {
  return (
    <div
      className={className(styles.box, {
        [styles.error]: type === "ERROR",
        [styles.success]: type === "SUCCESS",
      })}
    >
      {message ? message : children}
    </div>
  );
};
export default AlertBox;
