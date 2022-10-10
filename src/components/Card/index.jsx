import * as S from "../../styles/style.js";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Card } from "antd";
const { Meta } = Card;

export const BoxCard = ({ data }) => {
  const { description, model, owner, status, healthLevel, unit } = data;

  return (
    <Card
      style={{
        width: 300,
      }}
      cover={data?.image && <S.CardImage alt={data.name} src={data.image} />}
      actions={[<EditOutlined key="edit" />, <DeleteOutlined key="delete" />]}
    >
      <Meta
        title={<S.Bold>{data.name}</S.Bold>}
        style={{ paddingBottom: 10 }}
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
  );
};
