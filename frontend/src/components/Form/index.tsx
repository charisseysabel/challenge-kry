import React from "react";
import { Error } from "../../pages/types";

const ERROR_MESSAGES = {
  MISSING_NAME: "Name is required",
  INVALID_URL: "Url is either missing or invalid",
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

type FormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  errors: Error[];
  name: string;
  setName: (name: string) => void;
  url: string;
  setUrl: (url: string) => void;
};
const Form = ({ onSubmit, errors, name, setName, url, setUrl }: FormProps) => {
  return (
    <>
      {errors.length !== 0 && <ErrorMessage errors={errors} />}
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Service Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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

export default Form;
