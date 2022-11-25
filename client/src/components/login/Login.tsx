import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import config from "../../assets/config";
import CustomLink from "../Link";

function Login() {
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const content = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const req = await fetch(`${config.apiHost}/login`, {
        credentials: "include",
      });
      if (req.ok) return navigate("/dashboard");
    })();
  }, []);

  async function loginReq(username: string, password: string) {
    fetch(`${config.apiHost}/api/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        location: window.location.origin,
      }),
    }).then(async (res) => {
      if (res.ok) {
        navigate("/dashboard");
      } else {
        const data = await res.json();
        setErrorMsg(data.message);
      }
    });
  }
  return (
    <div id="login-container">
      <CustomLink to="/welcome" className="back-icon">
        <IconButton>
          <ArrowBack></ArrowBack>
        </IconButton>
      </CustomLink>
      <div id="login-content" ref={content}>
        <form
          className="login-form left"
          onSubmit={(e) => {
            e.preventDefault();
            loginReq(userDetails.username, userDetails.password);
          }}
        >
          <h1>Log in</h1>
          <input
            className="form-input"
            type="text"
            placeholder="Username"
            required
            onChange={(e) => {
              const val = e.currentTarget.value;
              setUserDetails({ ...userDetails, username: val });
              setErrorMsg("");
            }}
          />
          <input
            className="form-input"
            type="password"
            placeholder="Password"
            required
            onChange={(e) => {
              const val = e.currentTarget.value;
              setUserDetails({ ...userDetails, password: val });
              setErrorMsg("");
            }}
          />
          <Link to={"/login/reset"} className="link">
            forgot your password?
          </Link>
          <button className="submit-btn" type="submit">
            LOG IN
          </button>
          <div className="msg">{errorMsg}</div>
        </form>
        <div className="login-form overlay-panel right">
          <p style={{ fontSize: "40px" }}>PARTYTIVITY</p>
          <h1>Hello, Party!</h1>
          <p>Enter your info and start to party!</p>
          <p>if you don't have an account</p>
          <button
            className="submit-btn"
            onClick={(e) => {
              content.current?.classList.add("switch");
              setTimeout(() => {
                navigate("/register");
              }, 300);
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
