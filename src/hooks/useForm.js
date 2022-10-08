import { useState } from "react";

export const useForm = (initState = {}) => {
  const [form, setForm] = useState(initState);

  const handleForm = ({ target: { value, name } }) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  return [form, handleForm];
};
