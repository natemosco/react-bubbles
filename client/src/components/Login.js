import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [creds, setCreds] = useState({
    username: "",
    password: ""
  });
  const handleChanges = (e) => {
    let target = e.target;
    setCreds((creds) => {
      return {
        ...creds,
        [target.id]: target.value
      }
    })
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log(creds, "creds");
    axiosWithAuth()
      .post("/api/login", creds)
      .then(res => {
        console.log(res, "login response");
        sessionStorage.setItem("token", res.data.payload);
        setCreds({
          username: "",
          password: ""
        });
        props.history.push("/my-bubbles!-their-all-mine!");
      })
      .catch(err => {
        console.log(err, "login error");
      });
  };
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <div>
        <form action="submit">
          <label htmlFor="username">username:</label>
          <input type="text" id="username" value={creds.username} placeholder="username: Lambda School" onChange={handleChanges} />
          <label htmlFor="password">password:</label>
          <input type="password" id="password" value={creds.password} placeholder="password: i<3Lambd4" onChange={handleChanges} />
          <button onClick={onSubmit}>Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
