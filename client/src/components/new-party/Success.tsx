import { Button, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { partySubmitState } from "./globalStates";

export default function Success() {
  const partySubmit = useRecoilValue(partySubmitState);
  const [animationData, setAnimationData] =
    useState<Record<string | number, any>>();
  const navigate = useNavigate();

  useEffect(() => {
    import("./V.json").then(setAnimationData);
  }, []);

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      style={{ textAlign: "center", display: partySubmit.submit ? "" : "none" }}
      spacing={3}
    >
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
          <Stack direction={"row"} spacing={2}>
            <Button
              style={{ width: "max-content" }}
              variant="outlined"
              color="secondary"
              onClick={() => {
                navigate(`/invite/${partySubmit.partyToken}`);
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
          </Stack>
        </>
      )}
    </Stack>
  );
}
