import { Button, Grid, IconButton, Paper, Link, Stack } from "@mui/material";
import DashboardTemplate from "../../dashboard/DashboardTemplate";
import BasicInformation from "./BasicInformation";
import AddServices, { addServicesInputsState } from "./AddServices";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Title from "../../dashboard/Title";
import { Link as Rlink } from "react-router-dom";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
} from "recoil";
import ServiceInput from "./ServiceInput";
import { Dayjs } from "dayjs";
import { useEffect } from "react";

export const partyDetailsState = atom({
  key: "partyDetails",
  default: {
    title: "" as string,
    des: "" as string,
    date: null as Dayjs | null,
    collaborators: [] as string[],
    entertainmentService: "" as string,
    foodService: "" as string,
    musicService: "" as string,
    generalService: "" as string,
    locationService: "" as string,
    photos: [] as string[],
  },
});

function NewParty() {
  const partyDetails = useRecoilValue(partyDetailsState);
  const resetPartyDetails = useResetRecoilState(partyDetailsState);
  const [serviceTypes, setServiceTypes] = useRecoilState<string[]>(
    addServicesInputsState
  );

  useEffect(() => {
    localStorage.setItem("details", JSON.stringify(partyDetails));
  }, [partyDetails]);

  function switchCaseService(serviceType: string, i: number) {
    switch (serviceType) {
      case "Entertainment Service":
        return <ServiceInput serviceType={"Entertainment Service"} key={i} />;
      case "Food Service":
        return <ServiceInput serviceType={"Food Service"} key={i} />;
      case "Music Service":
        return <ServiceInput serviceType={"Music Service"} key={i} />;
      case "General Service":
        return <ServiceInput serviceType={"General Service"} key={i} />;
      case "Location Service":
        return <ServiceInput serviceType={"Location Service"} key={i} />;
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
            <Rlink
              style={{ color: "inherit", textDecoration: "inherit" }}
              to="/dashboard/my-parties/"
            >
              <IconButton
                size="small"
                style={{ marginBottom: 15 }}
                aria-label="back"
              >
                <ArrowForwardIcon />
              </IconButton>
            </Rlink>
          </Stack>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              window.location.pathname = "/dashboard/my-parties/new/photos";
            }}
          >
            <Stack direction="column" spacing={5}>
              <BasicInformation />
              <AddServices />
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
