import { Button, Grid, IconButton, Link, Paper, Stack } from "@mui/material";
import DashboardTemplate from "../../dashboard/DashboardTemplate";
import BasicInformation from "./BasicInformation";
import AddServices from "./AddServices";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Title from "../../dashboard/Title";
import { useState } from "react";

function NewParty() {
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
            <Link
              style={{ color: "inherit", textDecoration: "inherit" }}
              href="/dashboard/my-parties/"
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
          <Stack direction="column" spacing={5}>
            <BasicInformation />
            <AddServices />
            <Stack direction="row" justifyContent={"space-between"}>
              <div />
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
        </Paper>
      </Grid>
    </DashboardTemplate>
  );
}

export default NewParty;
