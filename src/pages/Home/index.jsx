import * as S from "../../styles/style.js";

import {
  TeamOutlined,
  EyeOutlined,
  PlusOutlined,
  BarChartOutlined,
  BankOutlined,
  ToolOutlined,
  ApartmentOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import React, { useState } from "react";
import { Users } from "../../components/Users/index.jsx";
import { useAuth } from "../../hooks/useAuth.js";
import { Logout } from "../../components/Logout/index.jsx";
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Users", "sub 1", <TeamOutlined />, [
    getItem("Open", "1", <EyeOutlined />),
    getItem("Add", "2", <PlusOutlined />),
  ]),
  getItem("Companies", "sub 2", <BankOutlined />, [
    getItem("Open", "3", <EyeOutlined />),
    getItem("Add", "4", <PlusOutlined />),
  ]),
  getItem("Units", "sub 3", <ApartmentOutlined />, [
    getItem("Open", "5", <EyeOutlined />),
    getItem("Add", "6", <PlusOutlined />),
  ]),
  getItem("Assets", "sub 4", <ToolOutlined />, [
    getItem("Open", "7", <EyeOutlined />),
    getItem("Add", "8", <PlusOutlined />),
  ]),
  getItem("Graphs", "9", <BarChartOutlined />),
];

export const Home = () => {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState(0);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Logout />
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <S.Logo>
          <span>Tractian</span>
        </S.Logo>
        <Menu
          theme="dark"
          defaultSelectedKeys={["0"]}
          mode="inline"
          items={items}
          onSelect={(value) => setSelectedKey(+value.key)}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>{selectedKey === 1 && "Users"}</Breadcrumb.Item>
            <Breadcrumb.Item>{selectedKey === 1 && "Open"}</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 0,
              minHeight: 360,
            }}
          >
            {selectedKey === 1 && <Users />}
            {!selectedKey && (
              <span>
                Welcome {user.name}! <br /> Please, select some category.
              </span>
            )}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
            padding: "18px 42px",
          }}
        >
          Tractian ©2022 Created by Alyson Consuli
        </Footer>
      </Layout>
    </Layout>
  );
};
