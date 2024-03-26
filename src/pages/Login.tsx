"use client";
import { Button, Col, ConfigProvider, Row, Typography, message } from "antd";
import loginImage from "../assets/login.gif";

import Form from "../components/Forms/Form";
import FormInput from "../components/Forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import theme from "../utils/theme/theme";

// import logo from "../assets/logo.png";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../schemas/login";
import { storeUserInfo } from "../service/auth.service";
import { useUserLoginMutation } from "../redux/api/authApi";

import { LoadingOutlined } from "@ant-design/icons";
import { Link, redirect } from "react-router-dom";
type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const [userLogin, { isLoading }] = useUserLoginMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await userLogin({ ...data }).unwrap();

      if (res) {
        redirect("/");
        message.success("User logged in successfully!");
        console.log(res);
        storeUserInfo(res);
      } else message.error("Wrong email or password");
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <ConfigProvider theme={theme}>
      <Link to={"/"}>
        <p
          style={{
            fontSize: "1.8vw",
            margin: "2vw",
            fontWeight: "bold",
            color: "black",
          }}
        >
          S E N S A
        </p>
      </Link>
      <Row
        justify="center"
        align="middle"
        style={{
          minHeight: "80vh",
        }}
      >
        <Col sm={12} md={12} lg={10}>
          <img src={loginImage} width={400} alt="login image" />
        </Col>
        <Col sm={12} md={10} lg={8}>
          <h1
            style={{
              margin: "15px 0px",
              fontSize: "32px",
            }}
          >
            Welcome Back!
          </h1>
          <Typography.Title type="secondary" style={{ fontSize: "16px" }}>
            Login to access your account
          </Typography.Title>
          <div>
            <Form submitHandler={onSubmit} resolver={yupResolver(loginSchema)}>
              <div>
                <FormInput
                  name="email"
                  type="text"
                  size="large"
                  label="Email"
                  placeholder="Enter Your Email Address"
                />
              </div>
              <div
                style={{
                  margin: "15px 0px",
                }}
              >
                <FormInput
                  name="password"
                  type="password"
                  size="large"
                  label="Password"
                  placeholder="Enter Your Password"
                />
              </div>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: "100%",
                  height: "40px",
                  fontSize: "20px",
                  marginTop: "20px",
                  backgroundColor: "#BA68C8",
                }}
              >
                {isLoading ? <LoadingOutlined /> : "Log In"}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </ConfigProvider>
  );
};

export default Login;
