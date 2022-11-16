import { Button, Grid, Modal, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import PhotosCarousel from "./PhotosCarousel";
import PhotosButtons from "./PhotosButtons";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  addServicesInputsState,
  newPartyDetailsState,
  partySubmitState,
} from "../globalStates";
import NewPartyHeader from "../NewPartyHeader";
import config from "../../../assets/config";
import Success from "../Success";

function PhotosMain() {
  const partyDetails = useRecoilValue(newPartyDetailsState);
  const [partySubmit, setPartySubmit] = useRecoilState(partySubmitState);
  const resetAddServicesInput = useResetRecoilState(addServicesInputsState);
  const resetPartyDetails = useResetRecoilState(newPartyDetailsState);
  const [errorMsg, setErrorMsg] = useState({ show: false, error: "" });
  const [modal, setModal] = useState(false);

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
        setPartySubmit({ submit: true, partyToken: data.partyToken });
        resetPartyDetails();
        resetAddServicesInput();
        localStorage.removeItem("names");
      } else {
        const data = await res.json();
        setErrorMsg({ show: true, error: data.message });
        setTimeout(() => {
          setErrorMsg({ show: false, error: "" });
        }, 5000);
      }
    });
  }

  return (
    <Grid item xs={12}>
      <Paper
        className="newParty"
        style={{
          alignItems: partySubmit.submit ? "center" : "",
          backgroundColor: partySubmit.submit ? "#e7e8fd" : "",
          paddingBottom: partySubmit.submit ? 50 : 20,
        }}
        elevation={2}
      >
        {partySubmit.submit ? (
          <Success />
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
            <PhotosButtons />
            <Modal
              open={modal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <div className="errorModal">
                <h2>Are you sure?</h2>
                <p>
                  {" "}
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
