import React, { useState } from "react";
import { USER_REGISTER } from "../gqloptions/mutation";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState("");
  const [UserRegister, { data, loading, error }] = useMutation(USER_REGISTER, {
    onCompleted(data) {
      alert("User registered!");
      navigate("/login");
    },
  });
  if (loading) return <p>Loading....</p>;
  if (error) {
    console.log("Error ", error.message);
  }
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.role || formData.role === "select") {
      setFormError("Please select a valid role");
      return;
    }
    UserRegister({
      variables: {
        newRegister: formData,
      },
    });
  };
  return (
    <div className="container">
      <div className="loginDiv">
        <form onSubmit={handleSubmit}>
          <h2>User Register</h2>
          <div>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              onChange={handleChange}
            />
          </div>
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
          <div>
            <select name="role" onChange={handleChange} required>
              <option value="select">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <span style={{ color: "red" }}>{formError}</span>
          </div>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
