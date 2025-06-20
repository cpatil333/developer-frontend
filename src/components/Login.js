import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_LOGIN } from "../gqloptions/mutation.js";
import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [LoginInput, { data, loading, error }] = useMutation(GET_LOGIN, {
    onCompleted(data) {
      localStorage.setItem("token", data.userLogin.token);
      navigate("/");
    },
  });

  if (loading) return <p>Loading....</p>;
  if (error) {
    console.log(error);
    return <p>Error loading login : error.message</p>;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    LoginInput({
      variables: {
        login: formData,
      },
    });
  };

  return (
    <div className="container">
      <div className="loginDiv">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
