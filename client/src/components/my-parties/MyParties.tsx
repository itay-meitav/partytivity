import { Grid, Paper } from "@mui/material";
import PartiesList from "./PartiesList";
import MyPartiesHeading from "./MyPartiesHeading";
import "./_myParties.scss";

function MyParties() {
  return (
    <Grid item xs={12}>
      <Paper className="myParties" elevation={2}>
        <MyPartiesHeading />
        <PartiesList />
      </Paper>
    </Grid>
  );
}

export default MyParties;
