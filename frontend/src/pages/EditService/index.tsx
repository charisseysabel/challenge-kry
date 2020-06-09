import React, { useState } from "react";
import Form from "../../components/Form";
import { validateFields } from "../../components/Form/helpers/formValidators";
import { Error } from "../../types";
import { updateService } from "../../api/service";
import { Card } from "../../components/Card";

type EditServiceProps = {
  id: string;
  name: string;
  url: string;
};

const EditService = ({ service }: { service: EditServiceProps }) => {
  const [editName, setEditName] = useState<string>(service.name);
  const [editUrl, setEditUrl] = useState<string>(service.url);
  const [errors, setErrors] = useState<Error[]>([]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);

    const areAllValid = validateFields(editName, editUrl, errors, setErrors);
    if (!areAllValid) {
      return;
    } else {
      updateService({ ...service, name: editName, url: editUrl }).then(
        () => console.log("success"),
        () => console.log("failed update")
      );
    }
  };

  const formProps = {
    onSubmit,
    name: editName,
    setName: setEditName,
    url: editUrl,
    setUrl: setEditUrl,
    errors,
    isCreate: false,
  };

  return (
    <Card>
      <h1>Edit Service</h1>
      <Form {...formProps} />
    </Card>
  );
};

export default EditService;
