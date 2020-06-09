import React from "react";
import { Service } from "../../types";
import Status from "./Status";
import ActionContainer from "./ActionContainer";
import styles from "./styles.module.css";

const Item = ({
  service,
  onDelete,
}: {
  service: Service;
  onDelete: (id: string) => void;
}) => {
  const { status, name, url } = service;

  return (
    <li className={styles.listItem}>
      <div className={styles.content}>
        <Status status={status} />
        <h2 className={styles.name}>{name}</h2>
        <a href={url} className={styles.url}>
          {url}
        </a>
      </div>
      <ActionContainer onDelete={onDelete} service={service} />
    </li>
  );
};

const List = ({
  services,
  onDelete,
}: {
  services: Service[];
  onDelete: (id: string) => void;
}) => {
  return (
    <>
      {services.length > 0 ? (
        <ul className={styles.list}>
          {services.map((s: Service) => (
            <Item service={s} onDelete={onDelete} key={s.id} />
          ))}
        </ul>
      ) : (
        <p>No services found</p>
      )}
    </>
  );
};

export default List;
