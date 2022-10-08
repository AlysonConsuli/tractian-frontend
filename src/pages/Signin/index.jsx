import { useForm } from "../../hooks/useForm.js";
import * as S from "../../styles/style.js";

export const Signin = () => {
  const [form, handleForm] = useForm({
    name: "Emerson",
    password: "1234",
  });

  const sendForm = (e) => {
    e.preventDefault();
    console.log(form);
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
        <button type="submit"></button>
      </form>
    </S.PageContainer>
  );
};
