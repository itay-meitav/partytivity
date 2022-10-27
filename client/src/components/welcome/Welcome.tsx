import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import { Link } from "react-router-dom";
import CustomLink from "../Link";
import WelcomeTemplate from "./welcomeTemplate/WelcomeTemplate";

export default function Welcome() {
  const [animationData, setAnimationData] =
    useState<Record<string | number, any>>();

  useEffect(() => {
    // fetch("/lottie/dance-party.json")
    //   .then((res) => res.json())
    //   .then((data) => setAnimationData(data));
    import("./dance-party.json").then(setAnimationData);
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
    <WelcomeTemplate>
      <div className="center-section">
        <div className="logos">
          <div className="center-logo-main">PARTYTIVITY</div>
          <div className="center-logo-subs">
            <div className="center-logo-sub1">Party.</div>
            <div className="center-logo-sub2">Simple.</div>
          </div>
        </div>
        <Lottie
          className="dance-party"
          animationData={animationData}
          play={true}
          loop={true}
        />
      </div>
    </WelcomeTemplate>
  );
}
