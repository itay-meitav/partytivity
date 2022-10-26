import { Button, Grid, Paper, Stack } from "@mui/material";
import DashboardTemplate from "../../../dashboard/DashboardTemplate";
import config from "../../../../assets/config";
import { useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { partyDetailsState } from "../NewParty";
import PhotosCarousel from "./PhotosCarousel";
import PhotosHeader from "./PhotosHeader";
import PhotosButtons from "./PhotosButtons";
import Lottie from "react-lottie-player";

function PhotosMain() {
  const [partyDetails, setPartyDetails] = useRecoilState(partyDetailsState);
  const resetPartyDetails = useResetRecoilState(partyDetailsState);
  const [submit, setSubmit] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [animationData, setAnimationData] =
    useState<Record<string | number, any>>();

  async function submitParty() {
    fetch(`${config.apiHost}/api/dashboard/my-parties/new/`, {
      method: "post",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        partyDetails,
      }),
    }).then(async (res) => {
      if (res.ok) {
        resetPartyDetails();
        localStorage.removeItem("names");
        setSubmit(true);
        import("../V.json").then(setAnimationData);
      } else {
        const data = await res.json();
        setErrorMsg(data.message);
      }
    });
  }

  return (
    <DashboardTemplate>
      <Grid item xs={12}>
        <Paper
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: submit ? "#e7e8fd" : "",
            minWidth: "max-content",
            minHeight: "400px",
            padding: 20,
            paddingBottom: submit ? 50 : 20,
          }}
          elevation={2}
        >
          <Stack
            justifyContent="center"
            alignItems="center"
            style={{ textAlign: "center", display: submit ? "" : "none" }}
            spacing={2}
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
                <h1 style={{ fontWeight: "bolder", fontSize: "56px" }}>
                  Success!
                </h1>
                <p>The new party has been added to your event list.</p>
                <p>Redirect to dashboard...</p>
              </>
            )}
          </Stack>
          <Stack
            style={submit ? { display: "none" } : {}}
            alignItems={"space-between"}
            justifyContent={"center"}
            width={"100%"}
            spacing={5}
          >
            <PhotosHeader />
            <div style={{ alignSelf: "center" }}>
              {!partyDetails.photos.length ? (
                <PhotosCarousel />
              ) : (
                <PhotosCarousel sources={partyDetails.photos} />
              )}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <PhotosButtons />
              <div style={{ display: "flex", alignItems: "center", gap: 45 }}>
                <div style={{ color: "#75706f" }}>{errorMsg}</div>
                <Button
                  style={{ width: "max-content", alignSelf: "flex-end" }}
                  variant="contained"
                  color="success"
                  // onClick={submitParty}
                >
                  Create Party
                </Button>
              </div>
            </div>
          </Stack>
        </Paper>
      </Grid>
    </DashboardTemplate>
  );
}

export default PhotosMain;
