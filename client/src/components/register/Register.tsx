import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import config from "../../assets/config";
import CustomLink from "../Link";
import RegisterInputs, { registerInputsState } from "./RegisterInputs";

function Register() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const content = useRef<HTMLDivElement>(null);
  const details = useRecoilValue(registerInputsState);
  

  useEffect(() => {
    fetch(`${config.apiHost}/login`, {
      credentials: "include",
    }).then((res) => {
      if (res.ok) navigate("/dashboard");
    });
  }, []);

  async function submitRegistration(
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
        location: window.location.origin,
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
              submitRegistration(
                details.name,
                details.username,
                details.firstPass,
                details.email
              )
                .then(async (res) => {
                  if (res.ok) {
                    navigate("/register/success");
                  } else {
                    const data = await res.json();
                    setMessage(data.message);
                    setTimeout(() => {
                      setMessage("");
                    }, 3000);
                  }
                })
                .catch((err) => {
                  setMessage(
                    "There is no connection to the server. Try again later."
                  );
                  setTimeout(() => {
                    setMessage("");
                  }, 3000);
                });
            } else {
              setMessage("The passwords do not match");
              setTimeout(() => {
                setMessage("");
              }, 3000);
            }
          }}
        >
          <h1 style={{ marginBottom: 18 }}>Sign Up</h1>
          <RegisterInputs />
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

export default Register;
