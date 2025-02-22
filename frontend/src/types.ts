export type Error = "MISSING_NAME" | "INVALID_URL" | "UNKNOWN_ERROR";

export type ServiceDto = {
  lastUpdate: string;
  services: Service[];
};

export interface BaseService {
  name: string;
  url: string;
}

export type Status = "OK" | "UNKNOWN" | "FAIL";

export interface Service extends BaseService {
  id: string;
  status: Status;
}
