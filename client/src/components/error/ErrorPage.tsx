import { useRouteError, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

function ErrorPage() {
  let error = useRouteError();
  console.error(error);
  const navigate = useNavigate();
  const [animationData, setAnimationData] =
    useState<Record<string | number, any>>();

  useEffect(() => {
    import("./error-animation.json").then(setAnimationData).then(() => {
      setTimeout(() => {
        navigate("/welcome");
      }, 3000);
    });
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
    <div className="error-page">
      <Lottie
        className="error-animation"
        animationData={animationData}
        play={true}
        loop={true}
      />
      <h1 className="errorTitle">
        Oops! <SentimentVeryDissatisfiedIcon className="sad-icon" />
      </h1>
      <p className="errorText">
        There's a problem with the connection to the server.
        <br /> Redirecting you back to the main page...
      </p>
    </div>
  );
}

export default ErrorPage;
