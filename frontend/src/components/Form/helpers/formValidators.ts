import { Error } from "../../../types";

export const validateFields = (
  name: string,
  url: string,
  errors: Error[],
  setErrors: (val: React.SetStateAction<Error[]>) => void
) => {
  if (!isValidName(name)) {
    setErrors((prev: Error[]) => [...prev, "MISSING_NAME"]);
  }

  if (!isValidUrl(url)) {
    setErrors((prev: Error[]) => [...prev, "INVALID_URL"]);
  }

  return errors.length === 0;
};

const isValidName = (name: string): boolean => {
  return name !== "";
};

const isValidUrl = (url: string): boolean => {
  return url !== "";
};
