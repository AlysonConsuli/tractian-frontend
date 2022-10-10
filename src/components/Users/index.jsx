/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { config } from "../../utils/config";
import { toastError } from "../../utils/toastError";
import * as S from "../../styles/style.js";
import { BoxCard } from "../Card";
import { Loading } from "../Loading";

export const Users = () => {
  const URL = `${process.env.REACT_APP_API_URL}/user`;
  const { user } = useAuth();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(URL, config(user))
      .then(({ data }) => setUsers(data.users))
      .catch((error) => toastError(error));
  }, []);

  if (!users?.length) {
    return <Loading />;
  }

  return (
    <S.CardContainer>
      {users?.map((user) => (
        <BoxCard key={user.id} data={user} />
      ))}
    </S.CardContainer>
  );
};
