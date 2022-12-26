import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import { useNavigate, useParams } from "react-router-dom";
import config from "../../assets/config";

function NewPassForm() {
  const [submit, setSubmit] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const [passwordAnimation, setPasswordAnimation] =
    useState<Record<string | number, any>>();
  const [successAnimation, setSuccessAnimation] =
    useState<Record<string | number, any>>();
  const [newPassword, setNewPassword] = useState({
    firstPassword: "",
    secondPassword: "",
  });
  const { token } = useParams();

  useEffect(() => {
    fetch(config.apiHost + `/api/login/reset/new/${token}`, {
      credentials: "include",
    }).then((res) => {
      if (!res.ok) {
        navigate("/login");
      }
      import("./password.json").then(setPasswordAnimation);
    });
  }, []);

  function resetPasswordReq() {
    fetch(config.apiHost + `/api/login/reset/new/${token}`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: newPassword.firstPassword }),
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

  if (!passwordAnimation)
    return (
      <div className="loader loaderCenter">
        <div className="loader-item"></div>
        <div className="loader-item"></div>
        <div className="loader-item"></div>
      </div>
    );

  return (
    <div id="newpass-container">
      <div
        style={submit ? { display: "none" } : {}}
        id="newpass-content"
      >
        <Lottie
          className="confirm-animation"
          animationData={passwordAnimation}
          play={true}
          loop={true}
        />
        <h1 id="title">New Password</h1>
        <form
          role="form"
          className="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (newPassword.firstPassword !== newPassword.secondPassword) {
              setErrorMsg("The passwords do not match each other");
            } else {
              resetPasswordReq();
            }
          }}
        >
          <div className="inputs">
            <input
              onChange={(e) => {
                setErrorMsg("");
                const val = e.currentTarget.value;
                setNewPassword({ ...newPassword, firstPassword: val });
              }}
              onCopy={(e) => {
                e.preventDefault();
              }}
              onCut={(e) => {
                e.preventDefault();
              }}
              onPaste={(e) => {
                e.preventDefault();
              }}
              className="form-input"
              type={showPassword ? "text" : "password"}
              placeholder="New password"
              required
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            />
            <input
              className="form-input"
              onChange={(e) => {
                setErrorMsg("");
                const val = e.currentTarget.value;
                setNewPassword({ ...newPassword, secondPassword: val });
              }}
              onCopy={(e) => {
                e.preventDefault();
              }}
              onCut={(e) => {
                e.preventDefault();
              }}
              onPaste={(e) => {
                e.preventDefault();
              }}
              type={showPassword ? "text" : "password"}
              placeholder="Repeat password"
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
          <button className="submit-btn" type="submit">
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
        <p>{errorMsg}</p>
      </div>
      <div style={submit ? {} : { display: "none" }} className="afterSubmit">
        <Lottie
          className="confirm-animation"
          style={{ width: 200 }}
          animationData={successAnimation}
          play
        />
        <h1>Success!</h1>
        <p>Now you can log in with the new password you just set.</p>
        <p>Redirect to the login page...</p>
      </div>
    </div>
  );
}

export default NewPassForm;
