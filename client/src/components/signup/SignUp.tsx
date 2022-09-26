import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomLink from "../Link";

function SignUp() {
  const navigate = useNavigate();
  const [submit, setSubmit] = useState<boolean>(false);
  const content = useRef<HTMLDivElement>(null);
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);

  useEffect(() => {}, [submit]);

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
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <h1>Sign Up</h1>
          <input
            className="form-input"
            type="text"
            placeholder="Username"
            ref={username}
            required
          />
          <input
            className="form-input"
            type={"email"}
            placeholder="Email"
            ref={email}
            required
          />
          <input
            className="form-input"
            type="password"
            ref={password}
            placeholder="Password"
            required
          />
          <input
            className="form-input"
            type="password"
            placeholder="Confirm password"
            required
          />
          <button
            onClick={(e) => {
              content.current?.classList.add("switch");
              setTimeout(() => {
                navigate("/register/success");
              }, 300);
            }}
            className="submit-btn"
            type="submit"
          >
            SIGN UP
          </button>
        </form>
        <div className="register-form overlay-panel left">
          <p style={{ fontSize: "40px" }}>PARTYTIVITY</p>
          <h1>Hello, Party!</h1>
          <p>Enter your info and start to party!</p>
          <p>already have an account?</p>
          <button
            className="submit-btn"
            onClick={(e) => {
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