import { Button, Grid, Paper, Stack } from "@mui/material";
import DashboardTemplate from "../../../dashboard/DashboardTemplate";
import config from "../../../../assets/config";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { partyDetailsState } from "../NewParty";
import PhotosCarousel from "./PhotosCarousel";
import PhotosHeader from "./PhotosHeader";
import PhotosButtons from "./PhotosButtons";
import Lottie from "react-lottie-player";

function PhotosMain() {
  const [partyDetails, setPartyDetails] = useRecoilState(partyDetailsState);
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
            backgroundColor: submit ? "#e7e8fd" : "",
            minWidth: "max-content",
            paddingBottom: submit ? 50 : 20,
          }}
          sx={{ p: 2, display: "flex", flexDirection: "column" }}
          elevation={2}
        >
          <Stack
            style={submit ? {} : { display: "none" }}
            alignItems={"center"}
            justifyContent={"center"}
            spacing={3}
          >
            {!animationData ? (
              <div className="main">
                <div className="center-section">
                  <ul className="loader">
                    <li className="loader-item"></li>
                    <li className="loader-item"></li>
                    <li className="loader-item"></li>
                  </ul>
                </div>
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
                <p style={{}}>
                  The new party has been added to your event list.
                </p>
                <p>Redirect to dashboard...</p>
              </>
            )}
          </Stack>
          <Stack
            style={submit ? { display: "none" } : {}}
            alignItems={"space-between"}
            justifyContent={"center"}
            spacing={5}
          >
            <PhotosHeader />
            {!partyDetails.photos.length ? (
              <PhotosCarousel />
            ) : (
              <PhotosCarousel sources={partyDetails.photos} />
            )}
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
