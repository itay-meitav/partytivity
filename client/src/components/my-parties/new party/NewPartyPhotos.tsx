import {
  Button,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import DashboardTemplate from "../../dashboard/DashboardTemplate";
import Title from "../../dashboard/Title";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "holderjs/holder";

function NewPartyPhotos() {
  return (
    <DashboardTemplate>
      <Grid item xs={12}>
        <Paper
          style={{ minWidth: "max-content" }}
          sx={{ p: 2, display: "flex", flexDirection: "column" }}
          elevation={2}
        >
          <Stack direction="column" spacing={5}>
            <Stack direction="column" spacing={-1}>
              <Stack direction="row" justifyContent={"space-between"}>
                <Title style={{ marginBottom: 20 }}>Party Photos</Title>
                <Link
                  style={{ color: "inherit", textDecoration: "inherit" }}
                  to="/dashboard/my-parties/new"
                >
                  <IconButton
                    size="small"
                    style={{ marginBottom: 15 }}
                    aria-label="back"
                  >
                    <ArrowForwardIcon />
                  </IconButton>
                </Link>
              </Stack>
              <Typography color="text.secondary" sx={{ flex: 1 }}>
                Add life to your party! Try something that will get people in
                without even blinking
              </Typography>
            </Stack>
            <Carousel style={{ flex: 2 }} variant="dark">
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="holder.js/800x400?text=Image&bg=eee"
                  alt="Photo"
                />
                <Carousel.Caption>
                  <h5>My First Image</h5>
                  <p>Description</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
            <Stack direction="row" justifyContent={"space-between"}>
              <form
                action="/api/photos"
                encType="multipart/form-data"
                method="post"
              >
                <Button
                  style={{ width: "max-content" }}
                  variant="contained"
                  type="submit"
                >
                  Upload Photo
                  <input hidden accept="image/*" multiple type="file" />
                </Button>
              </form>
              <Button
                style={{ width: "max-content" }}
                variant="contained"
                component="label"
                color="success"
              >
                Create Party
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Grid>
    </DashboardTemplate>
  );
}

export default NewPartyPhotos;
