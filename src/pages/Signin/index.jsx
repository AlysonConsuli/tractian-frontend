import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth.js";
import { useForm } from "../../hooks/useForm.js";
import * as S from "../../styles/style.js";
import { toastError } from "../../utils/toastError.js";
import { setLocalStorage } from "../../utils/useLocalStorage.js";

export const Signin = () => {
  const URL = `${process.env.REACT_APP_API_URL}/auth/sign-in`;
  const { user, setUser } = useAuth();
  const [disabled, setDisabled] = useState(false);
  const [form, handleForm] = useForm({
    name: "Emerson",
    password: "1234",
  });

  const sendForm = async (e) => {
    e.preventDefault();
    setDisabled(true);
    try {
      const { data } = await axios.post(URL, form);
      setUser({ ...user, ...data });
      setLocalStorage("user", data);
      toast(`Olá ${form.name}!`);
    } catch (error) {
      setDisabled(false);
      toastError(error, "Login error!");
    }
  };

  return (
    <S.PageContainer>
      <h1>Sign-in</h1>
      <form onSubmit={sendForm}>
        <input name="name" onChange={handleForm} value={form.name}></input>
        <input
          name="password"
          onChange={handleForm}
          value={form.password}
        ></input>
        <button type="submit" disabled={disabled}></button>
      </form>
    </S.PageContainer>
  );
};
