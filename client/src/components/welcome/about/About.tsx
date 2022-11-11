import React, { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import hat from "../../../assets/icons/hat.png";

function About() {
  const [animationData, setAnimationData] =
    useState<Record<string | number, any>>();

  useEffect(() => {
    import("./aboutUs.json").then(setAnimationData);
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
    <div className="about-center-section">
      <div className="left-center-section">
        <p className="title">Who Are we?</p>
        <p className="text-content">
          Let's face it, if you've come this far - it's a sign that you have a
          strong need to celebrate. So where do we come into the picture? What
          if we told you that a team of developers programmed a tool that
          connects you, the party fans, to a social network that brings together
          all the people with the need to party - just like you! Sounds crazy
          and beyond imagination isn't it? So, please meet{" "}
          <span className="nav-logo">
            <span className="nav-logo-text custom-font">
              P
              <img
                src={hat}
                className="nav-logo-img custom-icon"
                style={{ height: 15 }}
              />
              RTYTIVITY
            </span>
          </span>{" "}
          . Now all you have to do is follow the steps on the way to the next
          celebration... without unnecessary headaches of planning. The party
          fire will never go out! Let's Rock!
        </p>
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

export default About;
