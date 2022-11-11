import React, { useEffect, useState } from "react";
import CustomLink from "../../Link";
import hat from "../../../assets/icons/hat.png";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import Lottie from "react-lottie-player";
import "./_welcomeTemplate.scss";

function WelcomeTemplate({ children }: React.PropsWithChildren<{}>) {
  const [showPhoneNav, setShowPhoneNav] = useState(false);
  const [animationData, setAnimationData] =
    useState<Record<string | number, any>>();

  useEffect(() => {
    import("./ballons-mobile.json").then(setAnimationData);
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
    <div className="welcomePage">
      <div className="navbar">
        <CustomLink
          to="/"
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <div className="nav-logo">
            <div className="nav-logo-text">
              <p>
                P
                <img src={hat} className="nav-logo-img" />
                RTYTIVITY
              </p>
            </div>
          </div>
        </CustomLink>
        <nav>
          <div
            style={{ display: showPhoneNav ? "flex" : "" }}
            className="textButtons"
          >
            <CustomLink
              onClick={() => setShowPhoneNav(false)}
              style={{ color: "inherit", textDecoration: "inherit" }}
              to="/welcome/about"
            >
              What We Do
            </CustomLink>
            <CustomLink
              onClick={() => setShowPhoneNav(false)}
              style={{ color: "inherit", textDecoration: "inherit" }}
              to="/welcome/providers"
            >
              Providers
            </CustomLink>
            <CustomLink
              onClick={() => setShowPhoneNav(false)}
              style={{ color: "inherit", textDecoration: "inherit" }}
              to="/dashboard/my-parties"
            >
              Lets Party
            </CustomLink>
            <CustomLink
              onClick={() => setShowPhoneNav(false)}
              style={{ color: "inherit", textDecoration: "inherit" }}
              to="/login"
            >
              Login
            </CustomLink>
          </div>
        </nav>
        <IconButton
          className="nav-icon"
          style={showPhoneNav ? { position: "fixed" } : {}}
          onClick={() => setShowPhoneNav(!showPhoneNav)}
        >
          {!showPhoneNav ? <MenuIcon /> : <CloseIcon />}
        </IconButton>
      </div>
      {showPhoneNav ? (
        <Lottie
          className="balloons-mobile"
          animationData={animationData}
          play={true}
          loop={true}
          rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
        />
      ) : (
        ""
      )}

      {children}
    </div>
  );
}

export default WelcomeTemplate;
