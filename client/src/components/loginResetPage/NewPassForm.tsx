import { useEffect, useRef, useState } from "react";
import Lottie from "react-lottie-player";
import { useNavigate, useParams } from "react-router-dom";
import config from "../../assets/config";

function NewPassForm() {
  const content = useRef<HTMLDivElement>(null);
  const [submit, setSubmit] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const firstPassword = useRef<HTMLInputElement | null>(null);
  const secondPassword = useRef<HTMLInputElement | null>(null);
  const [animationData, setAnimationData] =
    useState<Record<string | number, any>>();
  const [authenticated, setAuthenticated] = useState(false);
  const { token } = useParams();

  useEffect(() => {
    import("./password.json").then(setAnimationData);
    fetch(config.apiHost + `login/reset/new/${token}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAuthenticated(true);
        } else {
          navigate("/login");
        }
      });
  }, []);

  if (!animationData || !authenticated)
    return (
      <ul className="loader">
        <li className="loader-item"></li>
        <li className="loader-item"></li>
        <li className="loader-item"></li>
      </ul>
    );

  return (
    <div id="newpass-container">
      <div id="newpass-content" ref={content}>
        <Lottie
          className="confirm-animation"
          animationData={animationData}
          play={true}
          loop={true}
        />
        <h1 id="title">New Password</h1>
        <form
          // autoComplete={"on"}
          role="form"
          className="login-form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="inputs">
            <input
              onChange={(e) => {
                setInput(e.currentTarget.value);
              }}
              ref={firstPassword}
              className="form-input"
              type={showPassword ? "text" : "password"}
              placeholder="New password"
              required
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            />
            <input
              className="form-input"
              type={showPassword ? "text" : "password"}
              placeholder="Repeat password"
              ref={secondPassword}
              required
            />
            <div
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              Show Password
            </div>
          </div>
          <button
            className="submit-btn"
            type="submit"
            onClick={() => {
              if (
                firstPassword.current?.value !== secondPassword.current?.value
              ) {
                setError(true);
                setSubmit(false);
              } else {
                setError(false);
                setSubmit(true);
                // setTimeout(() => {
                //   navigate("/login");
                // }, 2000);
              }
            }}
          >
            Change Password
          </button>
        </form>
        <div
          className="confirm"
          style={submit ? { display: "unset" } : { display: "none" }}
        >
          <p>Your password has been successfully changed.</p>
          <p>Redirect to the login page...</p>
        </div>
        <div
          className="confirm"
          style={error ? { display: "unset" } : { display: "none" }}
        >
          <p>The passwords do not match each other.</p>
        </div>
      </div>
    </div>
  );
}

export default NewPassForm;
