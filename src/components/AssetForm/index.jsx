/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { toastError } from "../../utils/toastError.js";
import { Button, Col, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { config } from "../../utils/config.js";
import { useAuth } from "../../hooks/useAuth.js";
import { Loading } from "../Loading/index.jsx";

export const AssetForm = () => {
  const URL = process.env.REACT_APP_API_URL;
  const [disabled, setDisabled] = useState(false);
  const [units, setUnits] = useState([]);
  const { user } = useAuth();

  const onFinish = async (values) => {
    setDisabled(true);
    try {
      await axios.post(`${URL}/asset`, values, config(user));
      toast(`asset created with success!`);
    } catch (error) {
      toastError(error, `Error to add asset!`);
    } finally {
      setDisabled(false);
    }
  };

  const onFinishFailed = () => {
    toast.error("Submit failed!");
  };

  useEffect(() => {
    axios
      .get(`${URL}/unit`, config(user))
      .then(({ data }) => setUnits(data))
      .catch((error) => toastError(error));
  }, []);

  if (!units?.length) {
    return <Loading />;
  }

  const btnLayout = {
    xs: { offset: 1 },
    sm: { offset: 6 },
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 11,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      disabled={disabled}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input the asset name!",
          },
        ]}
      >
        <Input placeholder="name" />
      </Form.Item>

      <Form.Item
        label="Unit"
        name="unitId"
        rules={[
          {
            required: true,
            message: "Please select some unit!",
          },
        ]}
      >
        <Select placeholder="Unit">
          {units.map((unit) => (
            <Select.Option key={unit.id} value={unit.id}>
              {unit.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Col {...btnLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Col>
    </Form>
  );
};
