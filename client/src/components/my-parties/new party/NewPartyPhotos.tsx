import {
  Button,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import DashboardTemplate from "../../dashboard/DashboardTemplate";
import Title from "../../dashboard/Title";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function NewPartyPhotos() {
  return (
    <DashboardTemplate>
      <Grid item xs={12}>
        <Paper
          style={{ minWidth: "max-content" }}
          sx={{ p: 2, display: "flex", flexDirection: "column" }}
          elevation={2}
        >
          <Stack direction="column" spacing={1}>
            <Stack
              direction="row"
              justifyContent={"space-between"}
              alignItems={"center"}
            >
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
            <Button
              style={{ width: "max-content" }}
              variant="contained"
              component="label"
            >
              Upload Photo
              <input hidden accept="image/*" multiple type="file" />
            </Button>
          </Stack>
        </Paper>
      </Grid>
    </DashboardTemplate>
  );
}

export default NewPartyPhotos;
