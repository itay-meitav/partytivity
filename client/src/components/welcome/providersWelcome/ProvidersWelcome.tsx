import React, { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import WelcomeTemplate from "../welcomeTemplate/WelcomeTemplate";
import hat from "../../../assets/icons/hat.png";

function ProvidersWelcome() {
  const [animationData, setAnimationData] =
    useState<Record<string | number, any>>();

  useEffect(() => {
    import("./providers.json").then(setAnimationData);
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
    <WelcomeTemplate>
      <div className="center-section">
        <div className="text">
          <p className="title">Hello Providers</p>
          <div className="text-content">
            <p>
              Before we dive into the details, you have reached the place where
              you can get <br />
              closest to your customers. And by extension, the virtual system of{" "}
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
              <br />
              Allows you to perform almost any action that you would probably
              perform on your phone,
              <br /> only that instead of a call - here you will perform it in a
              few clicks. Sounds more comfortable,
              <br /> doesn't it? But wait, everything discussed until now was
              part of a complete package deal: <br /> You will be published in
              the proposals of the party organizers, <br /> you will be able to
              receive well-arranged opinions from both the system and the
              customers, <br /> and you are not obligated to anything. <br />{" "}
              So... what are you waiting for?
            </p>
          </div>
        </div>
        <Lottie
          className="providers-animation"
          animationData={animationData}
          play={true}
          loop={true}
        />
      </div>
    </WelcomeTemplate>
  );
}

export default ProvidersWelcome;
