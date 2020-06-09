import React, { useState } from "react";
import Form from "../Form";
import { validateFields } from "../helpers/formValidators";
import { Error } from "../types";

type EditServiceProps = {
  id: string;
  name: string;
  url: string;
};

const EditService = ({ props }: { props: EditServiceProps }) => {
  const [editName, setEditName] = useState<string>(props.name);
  const [editUrl, setEditUrl] = useState<string>(props.url);
  const [errors, setErrors] = useState<Error[]>([]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);

    const areAllValid = validateFields(editName, editUrl, errors, setErrors);
    if (!areAllValid) {
      return;
    }

    // todo: do api call
    // api.updateService
  };

  const formProps = {
    onSubmit,
    name: editName,
    setName: setEditName,
    url: editUrl,
    setUrl: setEditUrl,
    errors,
  };

  return <Form {...formProps} />;
};

export default EditService;
