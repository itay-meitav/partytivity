import { Button, Grid, Paper, Tooltip, Typography } from "@mui/material";
import BasicInformation from "./BasicInformation";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { useEffect, useRef, useState } from "react";
import ServicesMain from "./add-services/ServicesMain";
import NewPartyHeader from "./NewPartyHeader";
import { addServicesInputsState, newPartyDetailsState } from "./globalStates";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";

function NewParty() {
  const partyDetails = useRecoilValue(newPartyDetailsState);
  const resetServiceTypes = useResetRecoilState(addServicesInputsState);
  const resetPartyDetails = useResetRecoilState(newPartyDetailsState);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("details", JSON.stringify(partyDetails));
  }, [partyDetails]);

  return (
    <Grid item xs={12}>
      <Paper className="newParty" elevation={2}>
        <NewPartyHeader title="New Party" link="/dashboard/my-parties" />
        <Typography color="text.secondary">Basic Information</Typography>
        <form
          id="myForm"
          style={{ width: "100%" }}
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/dashboard/my-parties/new/photos");
          }}
        >
          <BasicInformation />
        </form>
        <div className="servicesHeader">
          <Typography color="text.secondary">Services</Typography>
          <Tooltip
            id="button-tooltip-2"
            title="This step is completely optional. Only if you are already
              familiar with a provider's services and would like them again,
              you can add them here."
          >
            <ErrorOutlineIcon sx={{ width: 18, height: 18 }} />
          </Tooltip>
        </div>
        <ServicesMain />
        <div className="newPartyFooter">
          <Button
            style={{ width: "max-content" }}
            color="warning"
            variant="outlined"
            size="small"
            type="button"
            onClick={() => {
              resetPartyDetails();
              resetServiceTypes();
            }}
          >
            Clear Fields
          </Button>
          <Button
            style={{ width: "max-content" }}
            variant="outlined"
            size="small"
            type="submit"
            form="myForm"
          >
            Next Step
          </Button>
        </div>
      </Paper>
    </Grid>
  );
}

export default NewParty;
