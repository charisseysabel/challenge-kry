import className from "classnames";
import React from "react";
import styles from "./styles.module.css";

type AlertBox = {
  type: "ERROR" | "SUCCESS";
  children: React.ReactNode;
};

const AlertBox = ({ type, children }: AlertBox) => {
  return (
    <div
      className={className(styles.box, {
        [styles.error]: type === "ERROR",
        [styles.success]: type === "SUCCESS",
      })}
    >
      {children}
    </div>
  );
};
export default AlertBox;
