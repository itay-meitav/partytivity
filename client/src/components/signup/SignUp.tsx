import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../assets/config";
import CustomLink from "../Link";

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

  async function sighUpReq(
    name: string,
    username: string,
    password: string,
    email: string
  ) {
    return await fetch(`${config.apiHost}/api/register`, {
      method: "POST",
      credentials: "include",
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
              const val = e.currentTarget.value.replace(/[^\w\s]|[0-9]/gi, "");
              setDetails({ ...details, name: val });
            }}
            value={details.name}
            minLength={2}
            maxLength={20}
            title="There can be minimum of 2 and maximum of 20 characters. No special characters nor numbers."
            required
          />
          <input
            className="form-input"
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setMessage("");
              const val = e.currentTarget.value.replace(/[^\w]/gi, "");
              setDetails({ ...details, username: val });
            }}
            value={details.username}
            minLength={3}
            maxLength={15}
            title="There can be minimum of 3 and maximum of 15 characters. No special characters."
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
            pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            value={details.email}
            title="Standard email only."
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
            onCopy={(e) => {
              e.preventDefault();
            }}
            onCut={(e) => {
              e.preventDefault();
            }}
            onPaste={(e) => {
              e.preventDefault();
            }}
            placeholder="Password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters total."
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
            onCopy={(e) => {
              e.preventDefault();
            }}
            onCut={(e) => {
              e.preventDefault();
            }}
            onPaste={(e) => {
              e.preventDefault();
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
