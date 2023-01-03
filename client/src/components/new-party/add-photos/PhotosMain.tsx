import { Button, Grid, Modal, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import PhotosCarousel from "./PhotosCarousel";
import PhotosButtons from "./PhotosButtons";
import { newPartyDetailsState } from "../globalStates";
import NewPartyHeader from "../NewPartyHeader";
import config from "../../../assets/config";
import Success from "../Success";

function PhotosMain() {
  const partyDetails = useRecoilValue(newPartyDetailsState);
  const resetPartyDetails = useResetRecoilState(newPartyDetailsState);
  const [partySubmitted, setPartySubmitted] = useState(false);
  const [modal, setModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [partyToken, setPartyToken] = useState("");

  async function submitParty() {
    fetch(`${config.apiHost}/api/dashboard/my-parties/new/`, {
      method: "post",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...partyDetails,
        title: partyDetails.title.trim(),
      }),
    }).then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        setPartyToken(data.partyToken);
        localStorage.clear();
        resetPartyDetails();
        setPartySubmitted(true);
      } else {
        const data = await res.json();
        setErrorMessage(data.message);
        setTimeout(() => {
          setErrorMessage(data.message);
        }, 3000);
      }
    });
  }

  return (
    <Grid item xs={12}>
      <Paper
        style={{ backgroundColor: partySubmitted ? "#e7e8fd" : "" }}
        className={!partySubmitted ? "newParty" : "successParty"}
        elevation={2}
      >
        {partySubmitted ? (
          <Success partyToken={partyToken} />
        ) : (
          <>
            <NewPartyHeader
              title={"Party Photos"}
              link={"/dashboard/my-parties/new"}
            />
            <Typography color="text.secondary">
              Add life to your party! Try something that will get people in
              without even blinking!
              <br />
              <small>
                This step is optional, however you will be able to add images
                later.
              </small>
            </Typography>
            <PhotosCarousel sources={partyDetails.photos} />
            <div className="partyPhotosFooter">
              <PhotosButtons error={errorMessage} />
              <Button
                variant="contained"
                color="success"
                className="createButton"
                style={{ width: "max-content" }}
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
            <Modal
              open={modal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <div className="errorModal">
                <h2>Are you sure?</h2>
                <p>
                  We noticed that you chose to continue <br />
                  <b>without</b> setting photos. <br />
                  Are you sure?
                </p>
                <div className="modalButtons">
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
                </div>
              </div>
            </Modal>
          </>
        )}
      </Paper>
    </Grid>
  );
}

export default PhotosMain;
