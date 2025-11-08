import React from "react";
import { Form, Input, Button, Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice";
import { useDispatch } from "react-redux";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dummyUser = {
    email: "admin@portal.com",
    password: "admin@123",
  };

  const onSubmit = (values: { email: string; password: string }) => {
    if (
      values.email === dummyUser.email &&
      values.password === dummyUser.password
    ) {
      dispatch(login());
      message.success("Login successful!");
      navigate("/product-list");
    } else {
      message.error("Invalid credentials!");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f0f2f5",
      }}
    >
      <Card title="Admin Login" style={{ width: 360, borderRadius: 8 }}>
        <Form layout="vertical" onFinish={onSubmit}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input placeholder="admin@portal.com" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password placeholder="admin@123" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
