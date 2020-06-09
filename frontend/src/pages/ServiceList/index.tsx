import React, { useState, useEffect } from "react";
import { Service, ServiceDto } from "../../types";
import { getAllServices } from "../../api/service";

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

  return (
    <div>
      {serviceDto.lastUpdate && (
        <p>This list was last updated on {serviceDto.lastUpdate}</p>
      )}
      <ul>
        {serviceDto?.services.map((s: Service) => (
          <li key={s.id}>
            <div>
              <div>
                <span>{s.status}</span>
                <h2>{s.name}</h2>
                <a href={s.url}>{s.url}</a>
              </div>
              <div>
                <button onClick={() => undefined}>Edit</button>
                <button onClick={() => undefined}>Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceList;
