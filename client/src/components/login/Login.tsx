import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import config from "../../assets/config";
import CustomLink from "../Link";

function Login() {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const message = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  async function loginReq(username: string, password: string) {
    return await fetch(`${config.apiHost}/api/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
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
          onSubmit={async (e) => {
            e.preventDefault();
            await loginReq(
              username.current!.value,
              password.current!.value
            ).then(async (res) => {
              if (res.ok) {
                navigate("/dashboard");
              } else {
                const data = await res.json();
                message.current!.innerHTML = data.message;
              }
            });
          }}
        >
          <h1>Log in</h1>
          <input
            ref={username}
            className="form-input"
            type="text"
            placeholder="Username"
            required
            onInput={() => {
              message.current!.innerHTML = "";
            }}
          />
          <input
            ref={password}
            className="form-input"
            type="password"
            placeholder="Password"
            required
            onInput={() => {
              message.current!.innerHTML = "";
            }}
          />
          <Link to={"/login/reset"} className="link">
            forgot your password?
          </Link>
          <button className="submit-btn" type="submit">
            LOG IN
          </button>
          <div className="msg" ref={message}></div>
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
