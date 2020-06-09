import axios from "axios";
import { BaseService, ServiceDto } from "../types";

const URL =
  process.env.NODE_ENV === "development" ? "http://localhost:8080/service" : "";

export const getAllServices = async (): Promise<ServiceDto> => {
  const res = await axios.get(`${URL}`);
  return await res.data;
};

export const addService = async (service: BaseService): Promise<any> => {
  const res = await axios.post(`${URL}`, { data: service });
  return res.data;
};

export const deleteService = async (serviceId: string): Promise<ServiceDto> => {
  const res = await axios.delete(`${URL}`, {
    data: { id: serviceId },
  });
  return res.data;
};

export const updateService = async (service: BaseService): Promise<any> => {
  const res = await axios.put(`${URL}`, service);
  return res.data;
};
