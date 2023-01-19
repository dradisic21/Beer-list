import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const Registration = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    localStorage.setItem("Username", JSON.stringify(username));
    localStorage.setItem("Password", JSON.stringify(password));
    navigate("/");
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit(submitForm)}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Registration</h3>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              {...register("username")}
              type="text"
              className="form-control "
              placeholder="Enter Your Username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            {errors.username && <p role="alert" className="error-message">Username is required</p>}
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              {...register("password")}
              type="password"
              className="form-control mt-1"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password?.type === 'required' && <p role="alert" className="error-message">Password is required</p>}
          </div>
          <div className="form-button">
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Registration;
