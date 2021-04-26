import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card, message, Image } from "antd";

import { useHistory, Link } from "react-router-dom";
import fire from "../../firebase";
import styles from "./loginStyle.module.css";

import unmlogo from "./UONLOGO.png";

const LoginPage = ({ setUser, user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(email);
  const handleLogin = () => {
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            message.error(err.message);

            break;
          case "auth/wrong-password":
            message.error(err.message);
            break;
        }
      });
  };

  return (
    <section className={styles.section}>
      <Image className={styles.image} src={unmlogo} width={300} />
      <Card title="Login" style={{ width: "60vw" }}>
        <Form name="Login" onsub>
          <Form.Item label="Email">
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
          <Form.Item label="Password">
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button onClick={() => handleLogin()} type="primary">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </section>
  );
};

export default LoginPage;
