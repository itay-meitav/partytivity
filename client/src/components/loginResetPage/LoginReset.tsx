import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Lottie from "react-lottie-player";
import { Link, useNavigate } from "react-router-dom";
import config from "../../assets/config";
import CustomLink from "../Link";
import "./_loginReset.scss";

function LoginReset() {
  const content = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [mailAnimation, setMailAnimation] =
    useState<Record<string | number, any>>();
  const [successAnimation, setSuccessAnimation] =
    useState<Record<string | number, any>>();
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    import("./mail.json").then(setMailAnimation);
  }, []);

  function resetPasswordReq() {
    fetch(`${config.apiHost}/api/login/reset`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ location: window.location.origin, email: email }),
    }).then(async (res) => {
      if (res.ok) {
        import("../confirm/V.json").then(setSuccessAnimation);
        setSubmit(true);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        const data = await res.json();
        setErrorMsg(data.message);
      }
    });
  }

  if (!mailAnimation)
    return (
      <div className="loader loaderCenter">
        <div className="loader-item"></div>
        <div className="loader-item"></div>
        <div className="loader-item"></div>
      </div>
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
        <div
          style={submit ? { display: "none" } : {}}
          className="login-form overlay-panel right"
        >
          <Lottie
            className="email-animation"
            animationData={mailAnimation}
            play={true}
            loop={false}
          />
          <h1 id="title">It's Okay!</h1>
          <p>The party won't start without you.</p>
          <p>Registration Email:</p>
          <input
            type={"email"}
            onChange={(e) => {
              setErrorMsg("");
              const val = e.currentTarget.value;
              setEmail(val);
            }}
            id="form-input"
          />
          <button className="submit-btn" onClick={() => resetPasswordReq()}>
            Sent Email
          </button>
          <div>{errorMsg}</div>
        </div>
        <div style={submit ? {} : { display: "none" }} className="afterSubmit">
          <Lottie
            className="confirm-animation"
            style={{ width: 200 }}
            animationData={successAnimation}
            play
          />
          <h1>Check your email!</h1>
          <p>A mail with link to reset the password has been sent to you.</p>
          <p>Redirect to the login page...</p>
        </div>
      </div>
    </div>
  );
}

export default LoginReset;
