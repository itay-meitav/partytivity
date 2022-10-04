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
import { useRecoilState } from "recoil";
// import EntertainmentService from "./services/EntertainmentService";
// import FoodService from "./services/FoodService";
// import MusicService from "./services/MusicService";
// import GeneralService from "./services/GeneralService";
// import LocationService from "./services/LocationService";

function NewParty() {
  const [des, setDes] = useRecoilState(desState);
  const [title, setTitle] = useRecoilState(titleState);
  const [markedCollaborators, setMarkedCollaborators] = useRecoilState(
    markedCollaboratorsState
  );
  const [serviceType, setServiceType] = useRecoilState(serviceState);
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
            }}
          >
            <Stack direction="column" spacing={5}>
              <BasicInformation />
              <AddServices />
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
                    setServiceType("");
                  }}
                >
                  Clear Fields
                </Button>
                <Link
                  style={{ color: "inherit", textDecoration: "inherit" }}
                  href="/dashboard/my-parties/new/photos"
                >
                  <Button
                    style={{ width: "max-content" }}
                    variant="outlined"
                    size="small"
                    type="submit"
                  >
                    Next Step
                  </Button>
                </Link>
              </Stack>
            </Stack>
          </form>
        </Paper>
      </Grid>
    </DashboardTemplate>
  );
}

export default NewParty;
