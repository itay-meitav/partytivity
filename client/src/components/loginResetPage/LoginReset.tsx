import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Lottie from "react-lottie-player";
import { Link, useNavigate } from "react-router-dom";
import CustomLink from "../Link";

function Login() {
  const content = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [animationData, setAnimationData] =
    useState<Record<string | number, any>>();

  useEffect(() => {
    import("./mail.json").then(setAnimationData);
  }, []);

  if (!animationData)
    return (
      <ul className="loader">
        <li className="loader-item"></li>
        <li className="loader-item"></li>
        <li className="loader-item"></li>
      </ul>
    );
  return (
    <div id="reset-container">
      <CustomLink to="/login" className="back-icon">
        <IconButton>
          <ArrowBack></ArrowBack>
        </IconButton>
      </CustomLink>
      <div id="reset-content" ref={content}>
        <form
          className="login-form left"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <h1>Log in</h1>
          <input className="form-input" type="text" placeholder="Username" />
          <input
            className="form-input"
            type="password"
            placeholder="Password"
          />
          <Link to={"/login/reset"} className="link">
            forgot your password?
          </Link>
          <button className="submit-btn" type="submit">
            LOG IN
          </button>
        </form>
        <div className="login-form overlay-panel right">
          <Lottie
            className="email-animation"
            animationData={animationData}
            play={true}
            loop={false}
          />
          <h1 id="title">It's Okay!</h1>
          <p>The party won't start without you.</p>
          <p>Registration Email:</p>
          <input type={"email"} id="form-input" />
          <button
            className="submit-btn"
            onClick={(e) => {
              content.current?.classList.add("switch");
              setTimeout(() => {
                navigate("/register");
              }, 300);
            }}
          >
            Sent Email
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
