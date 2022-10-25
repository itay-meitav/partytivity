import { Button, Grid, IconButton, Paper, Link, Stack } from "@mui/material";
import DashboardTemplate from "../../dashboard/DashboardTemplate";
import BasicInformation from "./BasicInformation";
import ServicesMain, {
  addServicesInputsState,
} from "./addServices/ServicesMain";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Title from "../../dashboard/Title";
import { useNavigate } from "react-router-dom";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
} from "recoil";
import ServiceInputs from "./addServices/ServiceInputs";
import { Dayjs } from "dayjs";
import { useEffect } from "react";

export const partyDetailsState = atom({
  key: "partyDetails",
  default: {
    title: "" as string,
    des: "" as string,
    date: null as Dayjs | null,
    collaborators: [] as string[],
    services: {
      entertainmentService: "" as string,
      foodService: "" as string,
      musicService: "" as string,
      generalService: "" as string,
      locationService: "" as string,
    },
    photos: [] as string[],
  },
});

function NewParty() {
  const partyDetails = useRecoilValue(partyDetailsState);
  const resetPartyDetails = useResetRecoilState(partyDetailsState);
  const [serviceTypes, setServiceTypes] = useRecoilState<string[]>(
    addServicesInputsState
  );
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("details", JSON.stringify(partyDetails));
  }, [partyDetails]);

  function switchCaseService(serviceType: string, i: number) {
    switch (serviceType) {
      case "Entertainment Service":
        return <ServiceInputs serviceType={"Entertainment Service"} key={i} />;
      case "Food Service":
        return <ServiceInputs serviceType={"Food Service"} key={i} />;
      case "Music Service":
        return <ServiceInputs serviceType={"Music Service"} key={i} />;
      case "General Service":
        return <ServiceInputs serviceType={"General Service"} key={i} />;
      case "Location Service":
        return <ServiceInputs serviceType={"Location Service"} key={i} />;
    }
  }

  return (
    <DashboardTemplate>
      <Grid item xs={12}>
        <Paper
          style={{ minWidth: "max-content" }}
          sx={{ p: 2, display: "flex", flexDirection: "column" }}
          elevation={2}
        >
          <Stack
            direction="row"
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Title style={{ marginBottom: 20 }}>New Party</Title>
            <IconButton
              size="small"
              style={{ marginBottom: 15 }}
              aria-label="back"
              onClick={() => navigate("/dashboard/my-parties/")}
            >
              <ArrowForwardIcon />
            </IconButton>
          </Stack>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate("/dashboard/my-parties/new/photos");
            }}
          >
            <Stack direction="column" spacing={5}>
              <BasicInformation />
              <ServicesMain />
              <Stack
                direction="column"
                justifyContent={"flex-start"}
                alignItems={"flex-start"}
                spacing={3}
              >
                {serviceTypes.map((serviceType: string, i: number) =>
                  switchCaseService(serviceType, i)
                )}
              </Stack>
              <Stack direction="row" justifyContent={"space-between"}>
                <Button
                  style={{ width: "max-content" }}
                  color="warning"
                  variant="outlined"
                  size="small"
                  type="button"
                  onClick={() => {
                    resetPartyDetails();
                    setServiceTypes([]);
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
    </DashboardTemplate>
  );
}

export default NewParty;
