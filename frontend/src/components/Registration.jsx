import React, { useState } from "react";
import "../css/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Registration = () => {
  const [name, setName] = useState();
  const [lastname, setLastname] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/auth/register", {
        name,
        lastname,
        username,
        email,
        password,
      })
      .then((res) => {
        navigate("/");
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Register</h2> <br />
        <div className="form-group">
          <label htmlFor="fname">Name:</label>
          <input
            type="name"
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lname">Last Name:</label>
          <input
            type="lastname"
            placeholder="Enter Last Name"
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="uname">Username:</label>
          <input
            type="username"
            placeholder="Enter Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn-signup" onClick={handleSubmit}>
          Sign Up
        </button>
        <p>Already Registered</p>
        <button className="btn-login">Login</button>
      </div>
    </div>
  );
};

export default Registration;
