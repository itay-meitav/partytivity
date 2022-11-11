import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";

export default function Welcome() {
  const [animationData, setAnimationData] =
    useState<Record<string | number, any>>();

  useEffect(() => {
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
    <div className="welcome-center-section">
      <div className="left-center-section">
        <div className="center-logo-main">PARTYTIVITY</div>
        <div className="center-logo-subs">
          <div className="center-logo-sub">Party.</div>
          <div className="center-logo-sub">Simple.</div>
        </div>
      </div>
      <Lottie
        className="right-center-section"
        animationData={animationData}
        play={true}
        loop={true}
      />
    </div>
  );
}
