import React from "react";
import styled from "styled-components";
import { Form, Button } from "semantic-ui-react";
import { USERNAME_KEY, PASSWORD_KEY } from "./util";

const Container = styled.div`
  width: 400px;
  margin: 0 auto;
  padding-top: 30vh;
`;

export const Login = (props) => {
  let username = '';
  let password = '';

  const { setShowLogin, getInitialFiles } = props;

  const login = () => {
    localStorage.setItem(USERNAME_KEY, username);
    localStorage.setItem(PASSWORD_KEY, password);

    setShowLogin(false);
    getInitialFiles();
  };

  return (
    <Container>
      <Form>
        <Form.Field>
          <label>Username</label>
          <input placeholder="Username" onChange={e => username = e.target.value} />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input placeholder="Password" onChange={e => password = e.target.value}/>
        </Form.Field>
        <Button type="submit" onClick={login}>Login</Button>
      </Form>
    </Container>
  );
};

export default Login;
