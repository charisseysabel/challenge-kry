import React, { useState } from "react";
import { addService } from "../../api/service";
import { Card } from "../../components/Card";
import Form from "../../components/Form";
import { validateFields } from "../../components/Form/helpers/formValidators";
import { Error } from "../../types";

const CreateService = () => {
  const [serviceName, setServiceName] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [errors, setErrors] = useState<Set<Error>>(new Set());
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(new Set());

    const areAllValid = validateFields(serviceName, url, errors, setErrors);
    if (!areAllValid) {
      return;
    }

    addService({ name: serviceName, url }).then(
      () => setShowSuccess(true),
      () =>
        setErrors((prev: Set<Error>) => {
          const set = new Set<Error>(prev);
          set.add("UNKNOWN_ERROR");

          return set;
        })
    );
  };

  const formProps = {
    onSubmit,
    name: serviceName,
    setName: setServiceName,
    url: url,
    setUrl: setUrl,
    errors,
    showSuccess,
  };

  return (
    <Card>
      <h1>Create a new service</h1>
      <Form {...formProps} />
    </Card>
  );
};

export default CreateService;
