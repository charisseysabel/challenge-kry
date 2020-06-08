import React, { useState } from "react";

type Error = "MISSING_NAME" | "INVALID_URL";
const ERROR_MESSAGES = {
  MISSING_NAME: "Name is required",
  INVALID_URL: "Url is either missing or invalid",
};

const areFieldsValid = (
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

const ErrorMessage = ({ errors }: { errors: Error[] }) => {
  return (
    <div>
      <p>Failed to submit form because of the following reasons:</p>
      <ul>
        {errors.map((e: Error, i: number) => (
          <li key={i}>{ERROR_MESSAGES[e]}</li>
        ))}
      </ul>
    </div>
  );
};

const CreateService = () => {
  const [serviceName, setServiceName] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [errors, setErrors] = useState<Error[]>([]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);

    const areAllValid = areFieldsValid(serviceName, url, errors, setErrors);
    if (!areAllValid) {
      return;
    }

    // todo: do api call
  };

  return (
    <>
      {errors.length !== 0 && <ErrorMessage errors={errors} />}
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Service Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
          required
        />

        <label htmlFor="url">URL</label>
        <input
          type="url"
          id="url"
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />

        <button type="submit">Create service</button>
      </form>
    </>
  );
};

export default CreateService;
