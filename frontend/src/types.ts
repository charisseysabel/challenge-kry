export type Error = "MISSING_NAME" | "INVALID_URL";

export type ServiceDto = {
  lastUpdate: string;
  services: Service[];
};

export interface BaseService {
  name: string;
  url: string;
}

export interface Service extends BaseService {
  id: string;
  status: "OK" | "UNKNOWN" | "FAIL";
}
