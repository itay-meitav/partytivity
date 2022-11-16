import { Button, Grid, Modal, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import PhotosCarousel from "./PhotosCarousel";
import PhotosButtons from "./PhotosButtons";
import {
  addServicesInputsState,
  newPartyDetailsState,
  newPartySubmitState,
} from "../globalStates";
import NewPartyHeader from "../NewPartyHeader";
import config from "../../../assets/config";
import { useNavigate } from "react-router-dom";

function PhotosMain() {
  const partyDetails = useRecoilValue(newPartyDetailsState);
  const [newPartySubmit, setNewPartySubmit] =
    useRecoilState(newPartySubmitState);
  const resetAddServicesInput = useResetRecoilState(addServicesInputsState);
  const resetPartyDetails = useResetRecoilState(newPartyDetailsState);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

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
        setNewPartySubmit({ errorMessage: "", partyToken: data.partyToken });
        resetPartyDetails();
        resetAddServicesInput();
        localStorage.removeItem("names");
        navigate("/dashboard/my-parties/new/success");
      } else {
        const data = await res.json();
        setNewPartySubmit({ errorMessage: data.message, partyToken: "" });
        setTimeout(() => {
          setNewPartySubmit({ errorMessage: "", partyToken: "" });
        }, 5000);
      }
    });
  }

  return (
    <Grid item xs={12}>
      <Paper className="newParty" elevation={2}>
        <NewPartyHeader
          title={"Party Photos"}
          link={"/dashboard/my-parties/new"}
        />
        <Typography color="text.secondary">
          Add life to your party! Try something that will get people in without
          even blinking!
          <br />
          <small>
            This step is optional, however you will be able to add images later.
          </small>
        </Typography>
        <PhotosCarousel sources={partyDetails.photos} />
        <PhotosButtons>
          <Button
            variant="contained"
            color="success"
            className="createButton"
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
        </PhotosButtons>
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
      </Paper>
    </Grid>
  );
}

export default PhotosMain;
