import { useEffect, useRef, useState } from "react";
import Lottie from "react-lottie-player";
import { useNavigate, useParams } from "react-router-dom";
import config from "../../assets/config";

function ConfirmEmail() {
  const content = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [animationData, setAnimationData] =
    useState<Record<string | number, any>>();
  const [authenticated, setAuthenticated] = useState(false);
  const { token } = useParams();

  useEffect(() => {
    import("./V.json").then(setAnimationData);
    fetch(config.apiHost + `/auth/confirm/${token}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAuthenticated(true);
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          navigate("/register");
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
    <div id="verified-container">
      <div id="verified-content" ref={content}>
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
