import moment from "moment";
import React, { useEffect, useState } from "react";
import { deleteService, getAllServices } from "../../api/service";
import { Card } from "../../components/Card";
import { ServiceDto } from "../../types";
import styles from "./styles.module.css";
import List from "./List";

const INITIAL_VALUES = {
  lastUpdate: "",
  services: [],
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
