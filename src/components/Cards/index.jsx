/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { config } from "../../utils/config";
import { toastError } from "../../utils/toastError";
import * as S from "../../styles/style.js";
import { BoxCard } from "../Card";
import { Loading } from "../Loading";

export const Cards = ({ selectedKey }) => {
  const uri = selectedKey.split("-")[1];

  const URL = `${process.env.REACT_APP_API_URL}/${uri}`;
  const { user } = useAuth();

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(URL, config(user))
      .then(({ data: incomingData }) => setData(incomingData))
      .catch((error) => toastError(error));
  }, []);

  if (!data?.length) {
    return <Loading />;
  }

  return (
    <S.CardContainer>
      {data?.map((el) => (
        <BoxCard key={el.id} data={el} />
      ))}
    </S.CardContainer>
  );
};
