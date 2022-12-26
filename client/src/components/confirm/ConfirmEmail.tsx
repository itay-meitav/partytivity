import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import { useNavigate, useParams } from "react-router-dom";
import config from "../../assets/config";

function ConfirmEmail() {
  const navigate = useNavigate();
  const [animationData, setAnimationData] =
    useState<Record<string | number, any>>();
  const [authenticated, setAuthenticated] = useState(false);
  const { token } = useParams();

  useEffect(() => {
    import("./V.json").then(setAnimationData);
    fetch(config.apiHost + `/api/auth/confirm/${token}`, {
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        setAuthenticated(true);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        navigate("/login");
      }
    });
  }, []);

  if (!animationData || !authenticated)
    return (
      <div className="loader loaderCenter">
        <div className="loader-item"></div>
        <div className="loader-item"></div>
        <div className="loader-item"></div>
      </div>
    );
  return (
    <div id="verified-container">
      <div id="verified-content">
        <Lottie
          className="confirm-animation"
          animationData={animationData}
          play={true}
          loop={true}
        />
        <h1 id="title">Time to party!</h1>
        <p>Your email has been successfully verified.</p>
        <p>Redirect to the login page...</p>
      </div>
    </div>
  );
}

export default ConfirmEmail;
