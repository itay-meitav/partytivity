import { Grid, Paper } from "@mui/material";
import List from "./List";

function MyParties() {
  return (
    <Grid item xs={12}>
      <Paper
        style={{ minWidth: "max-content" }}
        sx={{ p: 2, display: "flex", flexDirection: "column" }}
        elevation={2}
      >
        <List />
      </Paper>
    </Grid>
  );
}

export default MyParties;
