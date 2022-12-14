import * as S from "../../styles/style.js";
import { DeleteOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { ModalComponent } from "../Modal/index.jsx";
import { useState } from "react";
import axios from "axios";
import { config } from "../../utils/config.js";
import { useAuth } from "../../hooks/useAuth.js";
import { toast } from "react-toastify";
import { toastError } from "../../utils/toastError.js";
const { Meta } = Card;

export const BoxCard = ({ data, URL, reload, setReload, editIcon }) => {
  const { id, description, model, owner, status, healthLevel, unit } = data;
  const [deleteModal, setDeleteModal] = useState(false);
  const { user } = useAuth();

  const deleteCard = async () => {
    try {
      await axios.delete(`${URL}/${id}`, config(user));
      toast.success(`${data.name} was deleted!`);
      setReload(!reload);
    } catch (error) {
      toastError(error, `Error to delete!`);
    } finally {
      setDeleteModal(false);
    }
  };

  return (
    <>
      <ModalComponent
        modalState={deleteModal}
        callbackCloseModal={() => setDeleteModal(false)}
        callbackFunction={deleteCard}
        message={`delete ${data.name}`}
        btnMessage={"delete"}
      />
      <Card
        style={{
          width: 300,
        }}
        cover={data?.image && <S.CardImage alt={data.name} src={data.image} />}
        actions={[
          editIcon,
          <DeleteOutlined onClick={() => setDeleteModal(true)} key="delete" />,
        ]}
      >
        <Meta
          title={<S.Bold>{data.name}</S.Bold>}
          style={{ paddingBottom: 10, maxWidth: "24vw" }}
        />
        {data?.company?.name ? (
          <p>
            <S.Bold>Company:</S.Bold> {data.company.name}
          </p>
        ) : (
          data?.image && (
            <S.Ul>
              <li>
                <S.Bold>Description:</S.Bold> {description}
              </li>
              <li>
                <S.Bold>Model:</S.Bold> {model}
              </li>
              <li>
                <S.Bold>Owner:</S.Bold> {owner}
              </li>
              <li>
                <S.Bold>Status:</S.Bold> {status}
              </li>
              <li>
                <S.Bold>Health Level:</S.Bold> {healthLevel}%
              </li>
              <li>
                <S.Bold>Unit:</S.Bold> {unit.name}
              </li>
            </S.Ul>
          )
        )}
      </Card>
    </>
  );
};
