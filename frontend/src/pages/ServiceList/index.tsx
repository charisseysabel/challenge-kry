import React, { useState, useEffect } from "react";
import { Service, ServiceDto } from "../../types";
import { getAllServices, deleteService } from "../../api/service";
import { Link } from "react-router-dom";

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
    <div>
      {serviceDto.lastUpdate && (
        <p>This list was last updated on {serviceDto.lastUpdate}</p>
      )}
      <ul>
        {serviceDto.services.map((s: Service) => (
          <li key={s.id}>
            <div>
              <div>
                <span>{s.status}</span>
                <h2>{s.name}</h2>
                <a href={s.url}>{s.url}</a>
              </div>
              <div>
                <Link
                  to={{
                    pathname: `/edit/${s.id}`,
                    state: s,
                  }}
                >
                  Edit
                </Link>
                <button onClick={() => onDelete(s.id)}>Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceList;
