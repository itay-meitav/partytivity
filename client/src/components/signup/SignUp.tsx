import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import config from "../../assets/config";
import CustomLink from "../Link";

async function sighUpReq(username: string, password: string, email: string) {
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
    }),
  });
}

function SignUp() {
  const navigate = useNavigate();
  const [firstPass, setFirstPass] = useState("");
  const [secondPass, setSecondPass] = useState("");
  const content = useRef<HTMLDivElement>(null);
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const message = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      await fetch(`${config.apiHost}/register`, {
        credentials: "include",
      }).then(async (res) => {
        const data = await res.json();
        if (data.success) navigate("/dashboard");
      });
    })();
  }, []);

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
            if (firstPass == secondPass) {
              await sighUpReq(
                username.current!.value,
                password.current!.value,
                email.current!.value
              ).then(async (res) => {
                if (res.ok) {
                  navigate("/register/success");
                } else {
                  const data = await res.json();
                  message.current!.innerHTML = data.message;
                }
              });
            } else {
              message.current!.innerHTML = "The passwords do not match";
            }
          }}
        >
          <h1>Sign Up</h1>
          <input
            className="form-input"
            type="text"
            placeholder="Username"
            onInput={() => {
              message.current!.innerHTML = "";
            }}
            ref={username}
            required
          />
          <input
            className="form-input"
            type="email"
            placeholder="Email"
            onInput={() => {
              message.current!.innerHTML = "";
            }}
            ref={email}
            required
          />
          <input
            className="form-input"
            type="password"
            onInput={(e) => {
              message.current!.innerHTML = "";
              const val = e.currentTarget.value;
              setFirstPass(val);
            }}
            ref={password}
            placeholder="Password"
            required
          />
          <input
            className="form-input"
            type="password"
            onInput={(e) => {
              message.current!.innerHTML = "";
              const val = e.currentTarget.value;
              setSecondPass(val);
            }}
            placeholder="Confirm password"
            required
          />
          <button type="submit" className="submit-btn">
            SIGN UP
          </button>
          <div className="msg" ref={message}></div>
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
