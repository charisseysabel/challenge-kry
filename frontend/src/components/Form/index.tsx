import React from "react";
import Button, { ButtonContainer } from "../Button";
import styles from "./styles.module.css";
import ErrorMessage from "./ErrorMessage";
import { Error } from "../../types";

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
      <form onSubmit={onSubmit} className={styles.formContainer}>
        <div className={styles.group}>
          <label htmlFor="name" className={styles.label}>
            Service Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.group}>
          <label htmlFor="url" className={styles.label}>
            URL
          </label>
          <input
            type="url"
            id="url"
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <ButtonContainer>
          <Button type="submit">Create service</Button>
        </ButtonContainer>
      </form>
    </>
  );
};

export default Form;
