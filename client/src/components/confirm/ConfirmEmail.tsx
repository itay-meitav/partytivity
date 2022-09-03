import { useEffect, useRef, useState } from "react";
import Lottie from "react-lottie-player";
import { useNavigate } from "react-router-dom";

function ConfirmEmail() {
  const content = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [animationData, setAnimationData] =
    useState<Record<string | number, any>>();

  useEffect(() => {
    import("./V.json").then(setAnimationData);
    setTimeout(() => {
      navigate("/login");
    }, 3000);
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
