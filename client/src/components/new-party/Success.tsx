import { Button, Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import { useNavigate } from "react-router-dom";

type TProps = {
  partyToken: string;
};

export default function Success(props: TProps) {
  const [animationData, setAnimationData] =
    useState<Record<string | number, any>>();
  const navigate = useNavigate();

  useEffect(() => {
    import("./V.json").then(setAnimationData);
  }, []);

  return (
    <>
      {!animationData ? (
        <div className="loader">
          <div className="loader-item" />
          <div className="loader-item" />
          <div className="loader-item" />
        </div>
      ) : (
        <>
          <Lottie
            style={{ width: 250 }}
            animationData={animationData}
            play={true}
            loop={false}
          />
          <h1 style={{ fontWeight: "bolder", fontSize: "56px" }}>Success!</h1>
          <p>The new party has been added to your event list.</p>
          <div className="buttons">
            <Button
              style={{ width: "max-content" }}
              variant="outlined"
              color="secondary"
              onClick={() => {
                navigate(`/invite/${props.partyToken}`);
              }}
            >
              Get me in
            </Button>
            <Button
              style={{ width: "max-content" }}
              variant="outlined"
              color="secondary"
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              dashboard
            </Button>
          </div>
        </>
      )}
    </>
  );
}
