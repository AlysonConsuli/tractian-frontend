/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { toastError } from "../../utils/toastError.js";
import { Button, Col, Form, Input, Select, Switch } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { config } from "../../utils/config.js";
import { useAuth } from "../../hooks/useAuth.js";
import { Loading } from "../Loading/index.jsx";

export const Forms = ({ selectedKey }) => {
  const URL = process.env.REACT_APP_API_URL;
  const uri = selectedKey.split("-")[1];
  const [disabled, setDisabled] = useState(false);
  const [companies, setCompanies] = useState([]);
  const { user } = useAuth();

  const onFinish = async (values) => {
    setDisabled(true);
    try {
      await axios.post(`${URL}/${uri}`, values, config(user));
      toast(`${uri} created with success!`);
    } catch (error) {
      toastError(error, `Error to add ${uri}!`);
    } finally {
      setDisabled(false);
    }
  };

  const onFinishFailed = () => {
    toast.error("Submit failed!");
  };

  useEffect(() => {
    if (uri !== "company") {
      axios
        .get(`${URL}/company`, config(user))
        .then(({ data }) => setCompanies(data))
        .catch((error) => toastError(error));
    }
  }, []);

  if (uri !== "company" && !companies?.length) {
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
            message: "Please input the name!",
          },
        ]}
      >
        <Input placeholder="name" />
      </Form.Item>

      {uri === "user" && (
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              min: 4,
              message: "Minimum of 4 characters!",
            },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
      )}

      {uri !== "company" && (
        <Form.Item
          label="Company"
          name="companyId"
          rules={[
            {
              required: true,
              message: "Please select some company!",
            },
          ]}
        >
          <Select placeholder="Company">
            {companies.map((company) => (
              <Select.Option key={company.id} value={company.id}>
                {company.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )}

      {uri === "user" && (
        <Form.Item label="IsAdmin" name="isAdmin" valuePropName="checked">
          <Switch />
        </Form.Item>
      )}

      <Col {...btnLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Col>
    </Form>
  );
};
