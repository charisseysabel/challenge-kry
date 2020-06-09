import React, { useState, useEffect } from "react";
import { Service, ServiceDto } from "../types";

const INITIAL_VALUES = {
  lastUpdate: "",
  services: [],
};

const ServiceList = () => {
  const [serviceDto, setServiceDto] = useState<ServiceDto>(INITIAL_VALUES);

  useEffect(() => {
    // todo: api call
    // api.getAllServices
    // setServiceList
  });

  return (
    <div>
      {serviceDto.lastUpdate && (
        <p>This list was last updated on {serviceDto.lastUpdate}</p>
      )}
      <ul>
        {serviceDto?.services.map((s: Service) => (
          <li>
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
