import { toast } from "react-toastify";

export const toastError = (
  error,
  msg = "Something unexpected happened. Refresh the page to try again!",
) => {
  toast.error(error?.response?.data || msg);
};
