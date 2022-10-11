/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { toastError } from "../../utils/toastError.js";
import { Button, Col, Form, Input, InputNumber, Select } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { config } from "../../utils/config.js";
import { useAuth } from "../../hooks/useAuth.js";
import { Loading } from "../Loading/index.jsx";

export const AssetForm = ({ edit, setEdit }) => {
  const URL = process.env.REACT_APP_API_URL;
  const [disabled, setDisabled] = useState(false);
  const [units, setUnits] = useState([]);
  const { user } = useAuth();

  const onFinish = async (values) => {
    setDisabled(true);
    if (!edit) {
      try {
        await axios.post(`${URL}/asset`, values, config(user));
        toast.success(`asset created with success!`);
      } catch (error) {
        toastError(error, `Error to add asset!`);
      } finally {
        setDisabled(false);
      }
    } else {
      try {
        await axios.put(`${URL}/asset/${edit.id}`, values, config(user));
        toast.success(`asset edited with success!`);
        setEdit(false);
      } catch (error) {
        toastError(error, `Error to edit asset!`);
        setDisabled(false);
      }
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

  const btnLayout = {
    xs: { offset: 1 },
    sm: { offset: 6 },
  };

  if (!units?.length) {
    return <Loading />;
  }

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
        initialValue={edit?.name}
        rules={[
          {
            required: true,
            message: "Please input the asset name!",
          },
        ]}
      >
        <Input placeholder="Name" />
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

      <Form.Item
        label="Image"
        name="image"
        initialValue={edit?.image}
        rules={[
          {
            required: true,
            message: "Please input the asset image!",
          },
        ]}
      >
        <Input placeholder="Image" />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        initialValue={edit?.description}
        rules={[
          {
            required: true,
            message: "Please input the asset description!",
          },
        ]}
      >
        <Input placeholder="Description" />
      </Form.Item>

      <Form.Item
        label="Model"
        name="model"
        initialValue={edit?.model}
        rules={[
          {
            required: true,
            message: "Please input the asset model!",
          },
        ]}
      >
        <Input placeholder="Model" />
      </Form.Item>

      <Form.Item
        label="Owner"
        name="owner"
        initialValue={edit?.owner}
        rules={[
          {
            required: true,
            message: "Please input the asset owner!",
          },
        ]}
      >
        <Input placeholder="Owner" />
      </Form.Item>

      <Form.Item
        label="Status"
        name="status"
        initialValue={edit?.status}
        rules={[
          {
            required: true,
            message: "Please select some status!",
          },
        ]}
      >
        <Select placeholder="Status">
          <Select.Option value="Running">Running</Select.Option>
          <Select.Option value="Alerting">Alerting</Select.Option>
          <Select.Option value="Stopped">Stopped</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Health Level"
        name="healthLevel"
        initialValue={edit?.healthLevel || 100}
        rules={[
          {
            required: true,
            message: "Please input the asset health level!",
          },
        ]}
      >
        <InputNumber
          min={0}
          max={100}
          formatter={(value) => `${value}%`}
          parser={(value) => value.replace("%", "")}
        />
      </Form.Item>

      <Col {...btnLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Col>
    </Form>
  );
};
