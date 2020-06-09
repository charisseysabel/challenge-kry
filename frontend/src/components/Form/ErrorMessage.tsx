import React from "react";
import { Error } from "../../types";

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

export default ErrorMessage;
