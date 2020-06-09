import React from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

export const Card = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.card}>{children}</div>;
};

type CardLink = {
  children: React.ReactNode;
  link: string;
};

export const CardLink = ({ children, link }: CardLink) => {
  return (
    <Link to={link} className={styles.cardLink}>
      {children}
    </Link>
  );
};
