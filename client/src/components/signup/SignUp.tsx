import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useRef, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import config from "../../assets/config";
import CustomLink from "../Link";

async function sighUpReq(
  name: string,
  username: string,
  password: string,
  email: string
) {
  return await fetch(`${config.apiHost}/api/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
      email: email,
      name: name,
    }),
  });
}

function SignUp() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const content = useRef<HTMLDivElement>(null);
  const [details, setDetails] = useState({
    username: "",
    name: "",
    email: "",
    firstPass: "",
    secondPass: "",
  });
  return (
    <div id="register-container">
      <CustomLink to="/welcome" className="back-icon">
        <IconButton>
          <ArrowBack></ArrowBack>
        </IconButton>
      </CustomLink>
      <div id="register-content" ref={content}>
        <form
          className="register-form right"
          onSubmit={async (e) => {
            e.preventDefault();
            if (details.firstPass == details.secondPass) {
              sighUpReq(
                details.name,
                details.username,
                details.firstPass,
                details.email
              ).then(async (res) => {
                if (res.ok) {
                  navigate("/register/success");
                } else {
                  const data = await res.json();
                  setMessage(data.message);
                }
              });
            } else {
              setMessage("The passwords do not match");
            }
          }}
        >
          <h1>Sign Up</h1>
          <input
            className="form-input"
            type="text"
            placeholder="Full Name"
            onChange={(e) => {
              setMessage("");
              const val = e.currentTarget.value;
              setDetails({ ...details, name: val });
            }}
            required
          />
          <input
            className="form-input"
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setMessage("");
              const val = e.currentTarget.value;
              setDetails({ ...details, username: val });
            }}
            required
          />
          <input
            className="form-input"
            type="email"
            placeholder="Email"
            onChange={(e) => {
              setMessage("");
              const val = e.currentTarget.value;
              setDetails({ ...details, email: val });
            }}
            required
          />
          <input
            className="form-input"
            type="password"
            onChange={(e) => {
              setMessage("");
              const val = e.currentTarget.value;
              setDetails({ ...details, firstPass: val });
            }}
            placeholder="Password"
            required
          />
          <input
            className="form-input"
            type="password"
            onChange={(e) => {
              setMessage("");
              const val = e.currentTarget.value;
              setDetails({ ...details, secondPass: val });
            }}
            placeholder="Confirm password"
            required
          />
          <button type="submit" className="submit-btn">
            SIGN UP
          </button>
          <div className="msg">{message}</div>
        </form>
        <div className="register-form overlay-panel left">
          <p style={{ fontSize: "40px" }}>PARTYTIVITY</p>
          <h1>Hello, Party!</h1>
          <p>Enter your info and start to party!</p>
          <p>already have an account?</p>
          <button
            className="submit-btn"
            onClick={() => {
              content.current?.classList.add("switch");
              setTimeout(() => {
                navigate("/login");
              }, 300);
            }}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
