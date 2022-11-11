import { Button, Grid, Paper, Stack } from "@mui/material";
import BasicInformation from "./BasicInformation";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { useEffect } from "react";
import ServicesMain from "./add-services/ServicesMain";
import NewPartyHeader from "./NewPartyHeader";
import { addServicesInputsState, newPartyDetailsState } from "./globalStates";

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
      <Paper
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "column",
          gap: 15,
          minWidth: "max-content",
          minHeight: "400px",
          padding: 20,
        }}
        elevation={2}
      >
        <NewPartyHeader title={"New Party"} link={"/dashboard/my-parties"} />
        <form
          style={{ width: "100%" }}
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/dashboard/my-parties/new/photos");
          }}
        >
          <Stack
            justifyContent={"center"}
            alignItems={"flex-start"}
            width="100%"
            spacing={5}
          >
            <BasicInformation />
            <ServicesMain />
            <Stack
              direction="row"
              justifyContent={"space-between"}
              alignItems={"center"}
              width="100%"
            >
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
              >
                Next Step
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Grid>
  );
}

export default NewParty;
