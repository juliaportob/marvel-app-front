import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import validateEmailAndPassword from "../service/Validate";
import { loginUser } from "../service/NativeAPI";
import { setUserLogin } from "../service/LocalStorage";
import SpiderMan from "../images/spider-man.png";
import "../styles/Login.css";

export default function Login() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (validateEmailAndPassword(email, password)) {
      setIsDisabled(false);
    }
  }, [email, password]);

  const setUserOnAPI = async () => {
    const requestAPI = await loginUser(email, password);
    return requestAPI;
  };

  const handleClick = async () => {
    const resp = await setUserOnAPI();
    const { token, name, email, password, id } = resp;
    if (resp && !resp.message) {
      setUserLogin(token, name, email, password, id);
      history.push("/characters");
    }
    if (resp && resp.message) setMessage(resp.message);
  };

  const setField = (field, value) => {
    if (field === "Email") return setEmail(value);
    return setPassword(value);
  };

  return (
    <div className="main-div-login">
      <a href="https://fontmeme.com/3d-fonts/">
        <img
          className="login-title"
          src="https://fontmeme.com/permalink/210407/b230fb5c229aaae01a07a6588e401572.png"
          alt="3d-fonts"
          border="0"
        />
      </a>
      <div className="div-spider">
        <img className="spider-man" src={SpiderMan} alt="Spider Man" />
      </div>
      <section className="defaultPage">
        <form className="loginForm">
          <section className="loginInputs">
            <div className="individual-inputs">
              <Input
                className="individual-inputs"
                title="Email"
                type="text"
                value={email}
                onChange={setField}
                placeholder="User email"
              />
            </div>
            <div className="individual-inputs">
              <Input
                title="Password"
                type="password"
                value={password}
                onChange={setField}
                placeholder="User password"
              />
            </div>
          </section>
          {message !== "" && <span>{message}</span>}
          <section className="loginButtons">
            <Button
              title="Log in"
              className="indiv-btn"
              isDisabled={isDisabled}
              onClick={() => handleClick()}
            />
            <h3 className="create-account">Don't have an account?</h3>
            <Button
              title="Sign up"
              className="indiv-btn"
              onClick={() => history.push("/register")}
            />
          </section>
        </form>
      </section>
    </div>
  );
}
