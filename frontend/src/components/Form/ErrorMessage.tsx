import React from "react";
import { Error } from "../../types";
import AlertBox from "../AlertBox";

const ERROR_MESSAGES = {
  MISSING_NAME: "Name is required",
  INVALID_URL: "Url is either missing or invalid",
  UNKNOWN_ERROR: "Could not reach the server. Please try again later.",
};

const ErrorMessage = ({ errors }: { errors: Set<Error> }) => {
  const errorsAsArray = Array.from(errors);

  return (
    <AlertBox type="ERROR">
      <p>Failed to submit form because of the following reasons:</p>
      <ul>
        {errorsAsArray.map((e: Error, i: number) => (
          <li key={i}>{ERROR_MESSAGES[e]}</li>
        ))}
      </ul>
    </AlertBox>
  );
};

export default ErrorMessage;
