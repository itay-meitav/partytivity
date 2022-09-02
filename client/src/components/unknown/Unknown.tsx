import React from "react";
import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import CustomLink from "../Link";
import WelcomeTemplate from "../welcomeTemplate/WelcomeTemplate";

function Unknown() {
  const [animationData, setAnimationData] =
    useState<Record<string | number, any>>();

  useEffect(() => {
    import("./unknown.json").then(setAnimationData);
  }, []);

  if (!animationData)
    return (
      <div className="main">
        <div className="center-section">
          <ul className="loader">
            <li className="loader-item"></li>
            <li className="loader-item"></li>
            <li className="loader-item"></li>
          </ul>
        </div>
      </div>
    );
  return (
    <WelcomeTemplate>
      <div className="center-section">
        <Lottie
          className="unknown-animation"
          animationData={animationData}
          play={true}
          loop={true}
          style={{ width: 600, height: 600, margin: 0, padding: 0 }}
        />
      </div>
    </WelcomeTemplate>
  );
}

export default Unknown;
