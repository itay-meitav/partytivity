import { Button, Grid, Modal, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import PhotosCarousel from "./PhotosCarousel";
import PhotosButtons from "./PhotosButtons";
import Lottie from "react-lottie-player";
import { partyDetailsState, partySubmitState } from "../globalStates";
import NewPartyHeader from "../NewPartyHeader";
import config from "../../../assets/config";

function PhotosMain() {
  const partyDetails = useRecoilValue(partyDetailsState);
  const [partySubmit, setPartySubmit] = useRecoilState(partySubmitState);
  const resetPartyDetails = useResetRecoilState(partyDetailsState);
  const [submit, setSubmit] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [modal, setModal] = useState(false);

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
        setPartySubmit({ submit: true, partyToken: data.partyToken });
        resetPartyDetails();
        localStorage.removeItem("names");
      } else {
        const data = await res.json();
        setErrorMsg(data.message);
      }
    });
  }

  return (
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
          style={submit ? { display: "none" } : {}}
          alignItems={"space-between"}
          justifyContent={"center"}
          width={"100%"}
          spacing={5}
        >
          <NewPartyHeader
            title={`Add life to your party! Try something that will get people in without
          even blinking! ${(<br />)}
          ${(
            <small>
              This step is optional, however you will be able to add images
              later.
            </small>
          )}`}
            link={"/dashboard/my-parties/new"}
          />
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
  );
}

export default PhotosMain;
