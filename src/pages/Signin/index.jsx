import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth.js";
import * as S from "../../styles/style.js";
import { toastError } from "../../utils/toastError.js";
import { setLocalStorage } from "../../utils/useLocalStorage.js";
import { Button, Col, Form, Input } from "antd";
import { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

export const Signin = () => {
  const URL = `${process.env.REACT_APP_API_URL}/auth/sign-in`;
  const { user, setUser } = useAuth();
  const [disabled, setDisabled] = useState(false);

  const onFinish = async (values) => {
    setDisabled(true);
    try {
      const { data } = await axios.post(URL, values);
      setUser({ ...user, ...data });
      setLocalStorage("user", data);
      toast(`Olá ${values.name}!`);
    } catch (error) {
      setDisabled(false);
      toastError(error, "Login error!");
    }
  };

  const onFinishFailed = () => {
    toast.error("Login failed!");
  };

  const btnLayout = {
    xs: { offset: 1 },
    sm: { offset: 6 },
  };

  console.log(
    "Mensagem para correção: O cadastro de usuário é feito pelos gerentes, neste caso, Emerson e Roberta. Por este motivo, as credenciais de Emerson já foram inseridas, para que o site possa ser testado.",
  );

  return (
    <S.PageContainer>
      <S.BoxAuthLogo>
        <h1>Freios Supremos</h1>
      </S.BoxAuthLogo>
      <Form
        name="basic"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 12,
        }}
        initialValues={{
          name: "Emerson",
          password: "1234",
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
          <Input prefix={<UserOutlined className="site-form-item-icon" />} />
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
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
          />
        </Form.Item>

        <Col {...btnLayout}>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
        </Col>
      </Form>
    </S.PageContainer>
  );
};
