import React, { useState } from "react";
import Form from "../../components/Form";
import { Error } from "../../types";
import { validateFields } from "../../components/Form/helpers/formValidators";
import { addService } from "../../api/service";
import { Card } from "../../components/Card";

const CreateService = () => {
  const [serviceName, setServiceName] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [errors, setErrors] = useState<Error[]>([]);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);

    const areAllValid = validateFields(serviceName, url, errors, setErrors);
    if (!areAllValid) {
      return;
    }

    addService({ name: serviceName, url }).then(
      () => setShowSuccess(true),
      () => setErrors((prev) => [...prev, "UNKNOWN_ERROR"])
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
