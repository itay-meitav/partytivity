import { Typography } from "@mui/material";
import hat from "../../assets/icons/hat.png";
import React from "react";
import CustomLink from "../Link";

function PartyInviteFooter() {
  return (
    <>
      <Typography
        style={{ marginBottom: 50 }}
        variant="body2"
        color="text.secondary"
        align="center"
      >
        {"Copyright © "}
        <CustomLink
          style={{ color: "inherit", textDecoration: "inherit" }}
          to="/"
        >
          <span style={{ margin: 10 }} className="nav-logo">
            <span className="nav-logo-text custom-font">
              P
              <img
                src={hat}
                className="nav-logo-img custom-icon"
                style={{ height: 15 }}
              />
              RTYTIVITY
            </span>
          </span>
        </CustomLink>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </>
  );
}

export default PartyInviteFooter;
