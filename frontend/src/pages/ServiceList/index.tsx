import moment from "moment";
import React, { useEffect, useState } from "react";
import { deleteService, getAllServices } from "../../api/service";
import { Card } from "../../components/Card";
import { Service, ServiceDto } from "../../types";
import ActionContainer from "./ActionContainer";
import Status from "./Status";
import styles from "./styles.module.css";

const INITIAL_VALUES = {
  lastUpdate: "",
  services: [],
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
      ) : (
        <p>No services found</p>
      )}
    </>
  );
};

const ServiceList = () => {
  const [serviceDto, setServiceDto] = useState<ServiceDto>(INITIAL_VALUES);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { services } = serviceDto;

  useEffect(() => {
    getAllServices().then(
      (res) => {
        setIsLoading(false);
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
        <small className={styles.lastUpdate}>
          Updated {moment().calendar(serviceDto.lastUpdate)}
        </small>
      )}

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <List services={services} onDelete={onDelete} />
      )}
    </Card>
  );
};

export default ServiceList;
