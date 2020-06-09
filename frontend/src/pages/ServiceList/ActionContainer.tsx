import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { Service } from "../../types";

const ActionContainer = ({
  onDelete,
  service,
}: {
  onDelete: (id: string) => void;
  service: Service;
}) => {
  return (
    <div>
      <Link
        to={{
          pathname: `/edit/${service.id}`,
          state: service,
        }}
      >
        Edit
      </Link>
      <Button onClick={() => onDelete(service.id)} type="button">
        Delete
      </Button>
    </div>
  );
};

export default ActionContainer;
