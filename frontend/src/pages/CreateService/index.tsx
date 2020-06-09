import React, { useState } from "react";
import Form from "../../components/Form";
import { Error } from "../types";
import { validateFields } from "../../components/Form/helpers/formValidators";

const CreateService = () => {
  const [serviceName, setServiceName] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [errors, setErrors] = useState<Error[]>([]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);

    const areAllValid = validateFields(serviceName, url, errors, setErrors);
    if (!areAllValid) {
      return;
    }

    // todo: do api call
    // api.createService
  };

  const formProps = {
    onSubmit,
    name: serviceName,
    setName: setServiceName,
    url: url,
    setUrl: setUrl,
    errors,
  };

  return <Form {...formProps} />;
};

export default CreateService;
