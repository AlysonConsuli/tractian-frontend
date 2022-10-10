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
import { Cards } from "../../components/Cards/index.jsx";
import { useAuth } from "../../hooks/useAuth.js";
import { Logout } from "../../components/Logout/index.jsx";
import { Forms } from "../../components/Forms/index.jsx";
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
    getItem("Open", "open-user", <EyeOutlined />),
    getItem("Add", "add-user", <PlusOutlined />),
  ]),
  getItem("Companies", "sub 2", <BankOutlined />, [
    getItem("Open", "open-company", <EyeOutlined />),
    getItem("Add", "add-company", <PlusOutlined />),
  ]),
  getItem("Units", "sub 3", <ApartmentOutlined />, [
    getItem("Open", "openUnit", <EyeOutlined />),
    getItem("Add", "addUnit", <PlusOutlined />),
  ]),
  getItem("Assets", "sub 4", <ToolOutlined />, [
    getItem("Open", "openAsset", <EyeOutlined />),
    getItem("Add", "addAsset", <PlusOutlined />),
  ]),
  getItem("Graphs", "graph", <BarChartOutlined />),
];

export const Home = () => {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState();

  const conditions = {
    user: selectedKey === "open-user" || selectedKey === "add-user",
    company: selectedKey === "open-company" || selectedKey === "add-company",
    unit: selectedKey === "openUnit" || selectedKey === "addUnit",
    asset: selectedKey === "openAsset" || selectedKey === "addAsset",
    graph: selectedKey === "graph",
    open:
      selectedKey === "open-user" ||
      selectedKey === "open-company" ||
      selectedKey === "openUnit" ||
      selectedKey === "openAsset",
    add:
      selectedKey === "add-user" ||
      selectedKey === "add-company" ||
      selectedKey === "addUnit" ||
      selectedKey === "addAsset",
  };

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
          mode="inline"
          items={items}
          onSelect={(value) => setSelectedKey(value.key)}
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
            <Breadcrumb.Item>{conditions.user && "Users"}</Breadcrumb.Item>
            <Breadcrumb.Item>
              {conditions.company && "Companies"}
            </Breadcrumb.Item>
            <Breadcrumb.Item>{conditions.unit && "Units"}</Breadcrumb.Item>
            <Breadcrumb.Item>{conditions.asset && "Assets"}</Breadcrumb.Item>
            <Breadcrumb.Item>{conditions.graph && "Graphs"}</Breadcrumb.Item>
            <Breadcrumb.Item>{conditions.open && "Open"}</Breadcrumb.Item>
            <Breadcrumb.Item>{conditions.add && "Add"}</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 0,
              minHeight: 360,
            }}
          >
            {selectedKey === "open-user" && <Cards selectedKey={selectedKey} />}
            {selectedKey === "add-user" && <Forms selectedKey={selectedKey} />}
            {selectedKey === "open-company" && (
              <Cards selectedKey={selectedKey} />
            )}
            {selectedKey === "add-company" && (
              <Forms selectedKey={selectedKey} />
            )}
            {!selectedKey && (
              <S.HomeMsg>
                <span>
                  Welcome {user.name}! <br /> Please, select some category.
                </span>
              </S.HomeMsg>
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
