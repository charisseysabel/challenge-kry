import { useRef, useEffect, useState } from "react";
import { getAllServices } from "../api/service";
import { ServiceDto } from "../types";

const INITIAL_VALUES = {
  lastUpdate: "",
  services: [],
};

const useServicePoller = () => {
  const [data, setData] = useState<ServiceDto>(INITIAL_VALUES);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const pollId = useRef<number | undefined>();

  useEffect(() => {
    getAllServices().then(
      (res) => {
        setData(res);
        setIsLoading(false);
      },
      () => {
        stopPolling();
      }
    );
  }, []);

  useEffect(() => {
    const timeoutId = window.setInterval(() => {
      getAllServices().then(
        (res) => {
          setData(res);
        },
        () => {
          stopPolling();
        }
      );
    }, 60000);
    pollId.current = timeoutId;

    return () => {
      stopPolling();
    };
  }, []);

  const stopPolling = () => {
    window.clearInterval(pollId.current);
  };

  return { data, isLoading, setData };
};

export default useServicePoller;
