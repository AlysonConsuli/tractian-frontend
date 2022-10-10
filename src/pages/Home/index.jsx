import * as S from "../../styles/style.js";

import { DesktopOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import React, { useState } from "react";
import { Users } from "../../components/Users/index.jsx";
import { useAuth } from "../../hooks/useAuth.js";
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
  getItem("Users", "1", <TeamOutlined />),
  getItem("Companies", "2", <DesktopOutlined />),
  getItem("Units", "3", <UserOutlined />),
  getItem("Assets", "4", <TeamOutlined />),
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
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            {selectedKey === 1 && <Users />}
            {!selectedKey && (
              <span>Welcome {user.name}! Select some category.</span>
            )}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Tractian ©2022 Created by Alyson Consuli
        </Footer>
      </Layout>
    </Layout>
  );
};
