import React from "react";
import { Edit, List } from "react-feather";
import "../../App.css";
import { CardLink, Card } from "../../components/Card";
import styles from "./styles.module.css";

function Home() {
  return (
    <Card>
      <h1>KRY Service Poller</h1>
      <div className={styles.linkContainer}>
        <CardLink link={"/create"}>
          <span className={styles.icon}>
            <Edit size={40} />
          </span>
          Create new service
        </CardLink>
        <CardLink link={"/list"}>
          <span className={styles.icon}>
            <List size={40} />
          </span>
          View all services
        </CardLink>
      </div>
    </Card>
  );
}

export default Home;
