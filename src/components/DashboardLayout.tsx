import React, { useState } from "react";
import { Layout, Menu, Button, Dropdown, Avatar, Space } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  NotificationOutlined,
  DownOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const { Header, Sider, Content } = Layout;

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const userMenu = {
    items: [
      { key: "1", label: "Profile" },
      { key: "2", label: "Logout", onClick: handleLogout },
    ],
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <div
          style={{
            height: 64,
            margin: 16,
            background: "rgba(255,255,255,0.2)",
            borderRadius: 8,
            textAlign: "center",
            lineHeight: "64px",
            color: "white",
            fontWeight: "bold",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          {collapsed ? "A" : "Admin"}
        </div>

        <Menu
          theme="light"
          mode="inline"
          onClick={({ key }) => {
            if (key === "1") navigate("/product-list");
            if (key === "2") navigate("/manage-products");
          }}
          items={[
            {
              key: "1",
              icon: <AppstoreOutlined />,
              label: "Dashboard",
            },
            {
              key: "2",
              icon: <ShoppingCartOutlined />,
              label: "Manage Products",
            },
            {
              key: "4",
              icon: <NotificationOutlined />,
              label: "Alerts",
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            background: "#fff",
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: 18 }}
            />
            <span style={{ fontSize: "16px", fontWeight: 600 }}>
              Gifting Admin
            </span>
          </div>

          <Dropdown menu={userMenu} placement="bottomRight">
            <Space>
              <Avatar icon={<UserOutlined />} />
              <span>Sanskriti</span>
              <DownOutlined />
            </Space>
          </Dropdown>
        </Header>

        <Content
          style={{
            margin: 24,
            padding: 24,
            background: "#fff",
            borderRadius: 8,
            minHeight: "calc(100vh - 112px)",
            overflowY: "auto",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
