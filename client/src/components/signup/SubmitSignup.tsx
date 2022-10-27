import React, { useEffect, useRef, useState } from "react";
import Lottie from "react-lottie-player";
import { useNavigate } from "react-router-dom";
import CustomLink from "../Link";

function SubmitSignup() {
  const navigate = useNavigate();
  const [animationData, setAnimationData] =
    useState<Record<string | number, any>>();
  const content = useRef<HTMLDivElement>(null);
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);

  useEffect(() => {
    import("./conffetti.json").then(setAnimationData);
  }, []);

  if (!animationData)
    return (
      <div className="loader loaderCenter">
        <div className="loader-item"></div>
        <div className="loader-item"></div>
        <div className="loader-item"></div>
      </div>
    );
  return (
    <div id="submit-container">
      <div id="submit-content" ref={content}>
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
          <Lottie
            className="conffetti-animation"
            animationData={animationData}
            play={true}
            loop={true}
          />
          <h1 id="title">Lit!</h1>
          <p>The party is about to start.</p>
          <p id="last">Verify your email and we'll start right away!</p>
          <CustomLink
            to="/login"
            style={{ color: "inherit", textDecoration: "inherit" }}
            className="submit-btn"
          >
            BACK TO LOGIN PAGE
          </CustomLink>
        </div>
      </div>
    </div>
  );
}

export default SubmitSignup;
