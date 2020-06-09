import React, { useState, useEffect } from "react";
import className from "classnames";
import { Service, ServiceDto } from "../../types";
import { getAllServices, deleteService } from "../../api/service";
import { Link } from "react-router-dom";
import { Card } from "../../components/Card";
import styles from "./styles.module.css";
import Button from "../../components/Button";
import Status from "./Status";
import ActionContainer from "./ActionContainer";

const INITIAL_VALUES = {
  lastUpdate: "",
  services: [],
};

const ServiceList = () => {
  const [serviceDto, setServiceDto] = useState<ServiceDto>(INITIAL_VALUES);

  useEffect(() => {
    getAllServices().then(
      (res) => {
        setServiceDto(res);
      },
      (e) => {
        throw new Error(e);
      }
    );
  }, []);

  const onDelete = (id: string) => {
    deleteService(id).then(
      () => {
        const updatedDto = serviceDto.services.filter((s) => s.id !== id);
        setServiceDto((prev) => ({ ...prev, services: updatedDto }));
      },
      () => console.log("delete fail")
    );
  };

  return (
    <Card>
      <h1>Services List</h1>
      {serviceDto.lastUpdate && (
        <p>This list was last updated on {serviceDto.lastUpdate}</p>
      )}
      <ul className={styles.list}>
        {serviceDto.services.map((s: Service) => (
          <li key={s.id} className={styles.listItem}>
            <div className={styles.content}>
              <Status status={s.status} />
              <h2 className={styles.name}>{s.name}</h2>
              <a href={s.url} className={styles.url}>
                {s.url}
              </a>
            </div>
            <ActionContainer onDelete={onDelete} service={s} />
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default ServiceList;
