import React, { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import CustomLink from "../Link";

function SubmitRegister() {
  const [animationData, setAnimationData] =
    useState<Record<string | number, any>>();

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
      <div id="submit-content">
        <form className="register-form right">
          <h1>Sign Up</h1>
          <input
            className="form-input"
            type="text"
            placeholder="Username"
            required
          />
          <input
            className="form-input"
            type="email"
            placeholder="Email"
            required
          />
          <input
            className="form-input"
            type="password"
            placeholder="Password"
            required
          />
          <input
            className="form-input"
            type="password"
            placeholder="Confirm password"
            required
          />
          <button className="submit-btn" type="submit">
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
          <h1 id="success-title">Lit!</h1>
          <p id="success-sub1">The party is about to start.</p>
          <p id="success-sub2">Verify your email and we'll start right away!</p>
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

export default SubmitRegister;
