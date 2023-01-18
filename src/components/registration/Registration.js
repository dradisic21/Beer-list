import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registration = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const submitForm = (e) => {
      e.preventDefault();
      localStorage.setItem("Username", JSON.stringify(username));
      localStorage.setItem("Password", JSON.stringify(password));
      navigate("/")
    }

    return (
        <div className="Auth-form-container">
          <form className="Auth-form" onSubmit={submitForm}>
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Registration</h3>
              <div className="form-group mt-3">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control "
                  placeholder="Enter Your Username"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
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
}

export default Registration;