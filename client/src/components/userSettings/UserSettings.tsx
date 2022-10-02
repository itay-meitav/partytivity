import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DashboardTemplate from "../dashboard/DashboardTemplate";
import Title from "../dashboard/Title";
import DeleteIcon from "@mui/icons-material/Delete";

function UserSettings() {
  return (
    <DashboardTemplate>
      <Grid item xs={12}>
        <Paper
          style={{ minWidth: "max-content" }}
          sx={{ p: 2, display: "flex", flexDirection: "column", gap: 5 }}
          elevation={2}
        >
          <Stack direction="column" spacing={0.1}>
            <Title style={{ marginBottom: 20 }}>Settings</Title>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              User settings
            </Typography>
          </Stack>
          <FormControl variant="standard">
            <Stack direction="row" spacing={2}>
              <TextField label="Name" defaultValue="Hello World" />
              <TextField label="Email" defaultValue="Hello World" />
              <TextField label="User Type" defaultValue="Hello World" />
            </Stack>
          </FormControl>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            Other
          </Typography>
          <Stack direction="column" spacing={3}>
            <FormControlLabel
              control={<Checkbox color="secondary" />}
              label="Send me email notifications"
            />
            <Button
              variant="outlined"
              style={{ width: "max-content" }}
              color="secondary"
            >
              Switch To Provider
            </Button>
          </Stack>
          <Stack
            style={{ width: "auto" }}
            direction="row"
            justifyContent={"space-between"}
            spacing={2}
          >
            <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
              Delete Account
            </Button>
            <Button
              style={{ float: "right", width: "max-content" }}
              variant="outlined"
              color="success"
            >
              Save Changes
            </Button>
          </Stack>
        </Paper>
      </Grid>
    </DashboardTemplate>
  );
}

export default UserSettings;
