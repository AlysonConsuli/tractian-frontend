import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Card } from "antd";
const { Meta } = Card;

export const BoxCard = ({ data }) => {
  return (
    <Card
      style={{
        width: 300,
      }}
      actions={[<EditOutlined key="edit" />, <DeleteOutlined key="delete" />]}
    >
      <Meta
        title={data.name}
        description={data?.company?.name && `Company: ${data.company.name}`}
      />
    </Card>
  );
};
