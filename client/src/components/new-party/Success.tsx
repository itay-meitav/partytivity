import { Button, Grid, Paper, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { newPartySubmitState } from "./globalStates";

export default function Success() {
  const newPartySubmit = useRecoilValue(newPartySubmitState);
  const resetNewPartySubmit = useResetRecoilState(newPartySubmitState);
  const [animationData, setAnimationData] =
    useState<Record<string | number, any>>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!newPartySubmit.partyToken) {
      navigate("/dashboard/my-parties/new/");
    }
    import("./V.json").then(setAnimationData);
  }, []);

  return (
    <Grid item xs={12}>
      <Paper
        className="successParty"
        style={{ backgroundColor: "#e7e8fd" }}
        elevation={2}
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
            <div className="buttons">
              <Button
                style={{ width: "max-content" }}
                variant="outlined"
                color="secondary"
                onClick={() => {
                  resetNewPartySubmit();
                  navigate(`/invite/${newPartySubmit.partyToken}`);
                }}
              >
                Get me in
              </Button>
              <Button
                style={{ width: "max-content" }}
                variant="outlined"
                color="secondary"
                onClick={() => {
                  resetNewPartySubmit();
                  navigate("/dashboard");
                }}
              >
                dashboard
              </Button>
            </div>
          </>
        )}
      </Paper>
    </Grid>
  );
}
