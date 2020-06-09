import className from "classnames";
import React from "react";
import { Status as StatusType } from "../../types";
import styles from "./styles.module.css";

const Status = ({ status }: { status: StatusType }) => {
  return (
    <span
      className={className(styles.status, {
        [styles.statusGreen]: status === "OK",
        [styles.statusRed]: status === "FAIL",
        [styles.statusUnknown]: status === "UNKNOWN",
      })}
    >
      {status}
    </span>
  );
};

export default Status;
