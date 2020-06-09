export type Error = "MISSING_NAME" | "INVALID_URL";

export type ServiceDto = {
  lastUpdate: string;
  services: Service[];
};

export type Service = {
  id: string;
  name: string;
  url: string;
  status: "OK" | "UNKNOWN" | "FAIL";
};
