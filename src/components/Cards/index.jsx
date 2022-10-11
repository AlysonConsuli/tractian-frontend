/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { config } from "../../utils/config";
import { toastError } from "../../utils/toastError";
import * as S from "../../styles/style.js";
import { BoxCard } from "../Card";
import { Loading } from "../Loading";
import { EditOutlined } from "@ant-design/icons";
import { Forms } from "../Forms";

export const Cards = ({ selectedKey }) => {
  const uri = selectedKey.split("-")[1];

  const URL = `${process.env.REACT_APP_API_URL}/${uri}`;
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios
      .get(URL, config(user))
      .then(({ data: incomingData }) => setData(incomingData))
      .catch((error) => toastError(error));
  }, [reload, edit]);

  if (!data?.length) {
    return <Loading />;
  }

  if (edit) {
    return (
      <Forms
        selectedKey={selectedKey}
        edit={edit}
        setEdit={(value) => setEdit(value)}
      />
    );
  }

  return (
    <S.CardContainer>
      {data?.map((el) => (
        <BoxCard
          key={el.id}
          data={el}
          URL={URL}
          reload={reload}
          setReload={(value) => setReload(value)}
          editIcon={<EditOutlined key="edit" onClick={() => setEdit(el)} />}
        />
      ))}
    </S.CardContainer>
  );
};
