import { Button, Grid, Modal, Paper, Stack, Typography } from "@mui/material";
import DashboardTemplate from "../../../dashboard/DashboardTemplate";
import config from "../../../../assets/config";
import { useState } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { partyDetailsState } from "../NewParty";
import PhotosCarousel from "./PhotosCarousel";
import PhotosHeader from "./PhotosHeader";
import PhotosButtons from "./PhotosButtons";
import Lottie from "react-lottie-player";
import { useNavigate } from "react-router-dom";

function PhotosMain() {
  const partyDetails = useRecoilValue(partyDetailsState);
  const resetPartyDetails = useResetRecoilState(partyDetailsState);
  const [submit, setSubmit] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [modal, setModal] = useState(false);
  const [partyToken, setPartyToken] = useState("");
  const [animationData, setAnimationData] =
    useState<Record<string | number, any>>();
  const navigate = useNavigate();

  async function submitParty() {
    fetch(`${config.apiHost}/api/dashboard/my-parties/new/`, {
      method: "post",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(partyDetails),
    }).then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        setPartyToken(data.partyToken);
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
                <Stack direction={"row"} spacing={2}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      navigate(`${config.host}/invite/${partyToken}`);
                    }}
                  >
                    Get me in!
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      navigate(`${config.host}/dashboard`);
                    }}
                  >
                    Back to dashboard
                  </Button>
                </Stack>
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
                  onClick={() => {
                    if (partyDetails.photos.length) {
                      submitParty();
                    } else {
                      setModal(true);
                    }
                  }}
                >
                  Create Party
                </Button>
              </div>
            </div>
            <Modal
              open={modal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Stack
                alignItems={"center"}
                justifyContent={"center"}
                sx={{
                  position: "absolute" as "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 400,
                  bgcolor: "#EEEEEE",
                  borderRadius: 2,
                  boxShadow: 24,
                  p: 4,
                  gap: 1.5,
                }}
              >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Are you sure?
                </Typography>
                <Typography
                  id="modal-modal-description"
                  sx={{ mt: 2, textAlign: "center" }}
                >
                  We noticed that you chose to continue <br />
                  <b>without</b> setting photos. <br />
                  Are you sure?
                </Typography>
                <Stack direction={"row"} spacing={3}>
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={() => {
                      setModal(false);
                      submitParty();
                    }}
                  >
                    I'm sure
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => setModal(false)}
                  >
                    Take me back
                  </Button>
                </Stack>
              </Stack>
            </Modal>
          </Stack>
        </Paper>
      </Grid>
    </DashboardTemplate>
  );
}

export default PhotosMain;
