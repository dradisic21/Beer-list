import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import "./Login.css";
import "../../../src/ui/input.css";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
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
    navigate("/listbeer");
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit(submitForm)}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Login</h3>
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
            {errors.username?.type === 'required' && <p role="alert" className="error-message">Username is required</p>}
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
          <p className="register-link pt-4 pb-4">
            Not registered? <Link to="registration">Create an account</Link>
          </p>
        </div>
      </form>
    </div>
  );
};
export default Login;
