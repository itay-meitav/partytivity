import { Button, Grid, Paper, Stack } from "@mui/material";
import React from "react";
import DashboardTemplate from "../dashboard/DashboardTemplate";
import List from "./List";

function MyParties() {
  return (
    <DashboardTemplate>
      <Grid item xs={12}>
        <Paper
          style={{ minWidth: "max-content" }}
          sx={{ p: 2, display: "flex", flexDirection: "column" }}
          elevation={2}
        >
          <List />
        </Paper>
      </Grid>
    </DashboardTemplate>
  );
}

export default MyParties;
