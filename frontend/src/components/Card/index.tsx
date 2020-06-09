import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export const Card = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.card}>{children}</div>;
};

type CardLink = {
  children: React.ReactNode;
  link: string;
  text: string;
};

export const CardLink = ({ link, children, text }: CardLink) => {
  return (
    <Link to={link} className={styles.cardLink}>
      <span className={styles.icon}>{children}</span>
      {text}
    </Link>
  );
};
