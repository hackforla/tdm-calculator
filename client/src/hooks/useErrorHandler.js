import { useCallback } from "react";

import { useToast } from "../contexts/Toast";

const useErrorHandler = (email, historyPush) => {
  const toast = useToast();
  const toastAdd = toast.add;

  const handleError = useCallback(
    error => {
      if (error.response && error.response.status === 401) {
        toastAdd(
          "For your security, your session has expired. Please log in again."
        );
        historyPush(`/logout/${encodeURIComponent(email)}`);
      }
      console.error(error);
    },
    [email, toastAdd, historyPush]
  );

  return handleError;
};

export default useErrorHandler;
