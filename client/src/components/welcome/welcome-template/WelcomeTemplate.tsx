import React, { useEffect, useState } from "react";
import CustomLink from "../../Link";
import hat from "../../../assets/icons/hat.png";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import Lottie from "react-lottie-player";
import { Outlet } from "react-router-dom";

function WelcomeTemplate(props: React.PropsWithChildren) {
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
      <nav className="navbar">
        <CustomLink className="nav-logo" to="/">
          <div className="nav-logo-text">
            P
            <img src={hat} className="nav-logo-img" />
            RTYTIVITY
          </div>
        </CustomLink>
        <div
          style={showPhoneNav ? { display: "flex" } : {}}
          className="nav-links"
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
        <IconButton
          className="nav-icon"
          style={
            showPhoneNav ? { position: "fixed", top: "5%", right: "5%" } : {}
          }
          onClick={() => setShowPhoneNav(!showPhoneNav)}
        >
          {!showPhoneNav ? <MenuIcon /> : <CloseIcon />}
        </IconButton>
      </nav>
      {showPhoneNav && (
        <Lottie
          className="balloons-mobile"
          animationData={animationData}
          play={true}
          loop={true}
          rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
        />
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Outlet />
        {props.children}
      </div>
    </div>
  );
}

export default WelcomeTemplate;
