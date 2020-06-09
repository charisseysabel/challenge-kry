import axios from "axios";
import { ServiceDto, BaseService, Service } from "../types";

const BASE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:8080" : "";

export const getAllServices = async (): Promise<ServiceDto> => {
  const res = await axios.get(`${BASE_URL}/service`);
  return await res.data;
};

export const addService = async (service: BaseService): Promise<any> => {
  const res = await axios.post(`${BASE_URL}/service`, { data: service });
  return res.data;
};

export const editService = async (service: Service): Promise<any> => {
  const res = await axios.put(`${BASE_URL}/service`, service);
  return res.data;
};

export const deleteService = async (serviceId: string): Promise<any> => {
  const res = await axios.delete(`${BASE_URL}/service`, {
    data: { id: serviceId },
  });
  return res.data;
};

export const updateService = async (service: BaseService): Promise<any> => {
  const res = await axios.put(`${BASE_URL}/service`, service);
  return res.data;
};
