import { Button, Grid, IconButton, Paper, Link, Stack } from "@mui/material";
import DashboardTemplate from "../../dashboard/DashboardTemplate";
import BasicInformation, {
  desState,
  markedCollaboratorsState,
  titleState,
} from "./BasicInformation";
import AddServices, { serviceState } from "./AddServices";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Title from "../../dashboard/Title";
import { Link as Rlink } from "react-router-dom";
import { useSetRecoilState, useRecoilState } from "recoil";
import EntertainmentService from "./services/EntertainmentService";
import FoodService from "./services/FoodService";
import MusicService from "./services/MusicService";
import GeneralService from "./services/GeneralService";
import LocationService from "./services/LocationService";

function NewParty() {
  const setDes = useSetRecoilState(desState);
  const setTitle = useSetRecoilState(titleState);
  const setMarkedCollaborators = useSetRecoilState(markedCollaboratorsState);
  const [ServiceType, setServiceType] = useRecoilState(serviceState);

  function switchCaseService(x: string, i: number) {
    switch (x) {
      case "Entertainment Service":
        return <EntertainmentService key={i} />;
      case "Food Service":
        return <FoodService key={i} />;
      case "Music Service":
        return <MusicService key={i} />;
      case "General Service":
        return <GeneralService key={i} />;
      case "Location Service":
        return <LocationService key={i} />;
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
                {ServiceType.map((x, i) => {
                  return switchCaseService(x, i);
                })}
              </Stack>
              <Stack direction="row" justifyContent={"space-between"}>
                <Button
                  style={{ width: "max-content" }}
                  color="warning"
                  variant="outlined"
                  size="small"
                  type="submit"
                  onClick={() => {
                    localStorage.removeItem("details");
                    setMarkedCollaborators([]);
                    setTitle("");
                    setDes("");
                    setServiceType([]);
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
