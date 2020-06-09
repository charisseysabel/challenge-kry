import React from "react";
import Button, { ButtonContainer } from "../Button";
import styles from "./styles.module.css";
import ErrorMessage from "./ErrorMessage";
import { Error } from "../../types";
import AlertBox from "../AlertBox";

type FormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  errors: Error[];
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
        <AlertBox message={"Form submitted successfully"} type="SUCCESS" />
      )}
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
          <Button type="submit" kind="PRIMARY">
            {isCreate ? "Create" : "Edit"} service
          </Button>
        </ButtonContainer>
      </form>
    </>
  );
};

export default Form;
