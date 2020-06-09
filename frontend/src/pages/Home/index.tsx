import React from "react";
import { Edit, List } from "react-feather";
import { Card, CardLink } from "../../components/Card";
import styles from "./styles.module.css";

function Home() {
  return (
    <Card>
      <h1>KRY Service Poller</h1>
      <div className={styles.linkContainer}>
        <CardLink link={"/create"} text="Create new service">
          <Edit size={40} />
        </CardLink>
        <CardLink link={"/list"} text="View all services">
          <List size={40} />
        </CardLink>
      </div>
    </Card>
  );
}

export default Home;
