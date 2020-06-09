import { Error } from "../../../types";

export const validateFields = (
  name: string,
  url: string,
  errors: Set<Error>,
  setErrors: (val: React.SetStateAction<Set<Error>>) => void
) => {
  if (!isValidName(name)) {
    setErrors((prev: Set<Error>) => {
      const set = new Set<Error>(prev);
      set.add("MISSING_NAME");

      return set;
    });
  }

  if (!isValidUrl(url)) {
    setErrors((prev: Set<Error>) => {
      const set = new Set<Error>(prev);
      set.add("INVALID_URL");
      return set;
    });
  }

  return errors.size === 0;
};

const isValidName = (name: string): boolean => {
  return name !== "";
};

const isValidUrl = (url: string): boolean => {
  return url !== "";
};
