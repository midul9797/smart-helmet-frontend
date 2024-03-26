"use client";
import { Button, Col, ConfigProvider, Row, Typography, message } from "antd";
import signupImage from "../assets/signup.gif";

import Form from "../components/Forms/Form";
import FormInput from "../components/Forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import theme from "../utils/theme/theme";

import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../schemas/signup";
import { useUserSignupMutation } from "../redux/api/authApi";
import { Link, redirect } from "react-router-dom";

type FormValues = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup = () => {
  const [userSignup] = useUserSignupMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const { confirmPassword, ...rest } = data;

      const res = await userSignup({ ...rest, role: "customer" }).unwrap();
      if (res) {
        redirect("/login");
        message.success("User created successfully!");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <ConfigProvider theme={theme}>
      <Link to={"/"}>
        <p
          style={{
            margin: "2vw 0 1vw 2vw",
            fontSize: "1.8vw",
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
          minHeight: "70vh",
        }}
      >
        <Col sm={12} md={12} lg={10}>
          <img src={signupImage} width={350} alt="login image" />
        </Col>
        <Col sm={12} md={10} lg={8}>
          <h1
            style={{
              margin: "15px 0px",
              fontSize: "32px",
            }}
          >
            Join Us Today!
          </h1>
          <Typography.Text type="secondary">
            Sign up now to become part of our family
          </Typography.Text>
          <div>
            <Form submitHandler={onSubmit} resolver={yupResolver(signupSchema)}>
              <div
                style={{
                  display: "flex",

                  justifyContent: "space-between",
                }}
              >
                <div style={{ width: "48%" }}>
                  <FormInput
                    name="first_name"
                    type="text"
                    size="large"
                    label="First Name"
                    placeholder="Enter Your First Name"
                    required
                  />
                </div>
                <div style={{ width: "48%" }}>
                  <FormInput
                    name="last_name"
                    type="text"
                    size="large"
                    label="Last Name"
                    placeholder="Enter Your Last Name"
                    required
                  />
                </div>
              </div>
              <div>
                <FormInput
                  name="email"
                  type="text"
                  size="large"
                  label="Email"
                  placeholder="Enter Your Email Address"
                  required
                />
              </div>

              <div>
                <FormInput
                  name="password"
                  type="password"
                  size="large"
                  label="Password"
                  placeholder="Enter Your Password"
                  required
                />
              </div>
              <div>
                <FormInput
                  name="confirmPassword"
                  type="password"
                  size="large"
                  label="Confirm Password"
                  placeholder="Enter your password again"
                  required
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
                  marginBottom: "20px",
                  backgroundColor: "#BA68C8",
                }}
              >
                Create Account
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </ConfigProvider>
  );
};

export default Signup;
