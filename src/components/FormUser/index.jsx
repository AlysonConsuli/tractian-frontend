/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { toastError } from "../../utils/toastError.js";
import { Button, Col, Form, Input, message, Select, Switch } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { config } from "../../utils/config.js";
import { useAuth } from "../../hooks/useAuth.js";
import { Loading } from "../Loading/index.jsx";

export const FormUser = () => {
  const URL = `${process.env.REACT_APP_API_URL}`;
  const [disabled, setDisabled] = useState(false);
  const [companies, setCompanies] = useState([]);
  const { user } = useAuth();

  const onFinish = async (values) => {
    console.log(values);
    setDisabled(true);
    try {
      await axios.post(`${URL}/user`, values, config(user));
      toast("User created with success!");
    } catch (error) {
      toastError(error, "Error to add user!");
    } finally {
      setDisabled(false);
    }
  };

  const onFinishFailed = () => {
    message.error("Submit failed!");
  };

  useEffect(() => {
    axios
      .get(`${URL}/company`, config(user))
      .then(({ data }) => setCompanies(data.companies))
      .catch((error) => toastError(error));
  }, []);

  if (!companies?.length) {
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
        label="Username"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input placeholder="Username" />
      </Form.Item>

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

      <Form.Item
        label="Company"
        name="companyId"
        rules={[
          {
            required: true,
            message: "Please select your company!",
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

      <Form.Item label="IsAdmin" name="isAdmin" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Col {...btnLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Col>
    </Form>
  );
};
