import moment from "moment";
import React from "react";
import { deleteService } from "../../api/service";
import { Card } from "../../components/Card";
import usePoller from "../../hooks/usePoller";
import List from "./List";
import styles from "./styles.module.css";

const ServiceList = () => {
  const { data, isLoading, setData } = usePoller();
  const { services, lastUpdate } = data;

  const onDelete = (id: string) => {
    deleteService(id).then(
      (res) => {
        setData(res);
      },
      (e) => {
        throw new Error(e);
      }
    );
  };

  return (
    <Card>
      <h1>Services List</h1>
      {lastUpdate && (
        <small className={styles.lastUpdate} aria-live="polite">
          Updated {moment().calendar(lastUpdate)}
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
