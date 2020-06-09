import React from "react";
import { Error } from "../../types";
import AlertBox from "../AlertBox";
import Button, { ButtonContainer } from "../Button";
import ErrorMessage from "./ErrorMessage";
import styles from "./styles.module.css";

type FormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  errors: Set<Error>;
  name: string;
  setName: (name: string) => void;
  url: string;
  setUrl: (url: string) => void;
  showSuccess?: boolean;
  isCreate?: boolean;
};

const Form = ({
  onSubmit,
  errors,
  name,
  setName,
  url,
  setUrl,
  showSuccess,
  isCreate = true,
}: FormProps) => {
  return (
    <>
      {showSuccess && (
        <AlertBox type="SUCCESS">
          <p>Form submitted successfully</p>
        </AlertBox>
      )}
      {errors.size !== 0 && <ErrorMessage errors={errors} />}
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
            placeholder="My service"
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
            placeholder="http://www.google.com"
          />
        </div>

        <ButtonContainer>
          <Button type="submit" kind="PRIMARY">
            {isCreate ? "Create" : "Edit"} service
          </Button>
        </ButtonContainer>
      </form>
    </>
  );
};

export default Form;
