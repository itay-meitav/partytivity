import { Grid, Paper, Stack } from "@mui/material";
import DashboardTemplate from "../../../dashboard/DashboardTemplate";
import config from "../../../../assets/config";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { partyDetailsState } from "../NewParty";
import PhotosCarousel from "./PhotosCarousel";
import PhotosHeader from "./PhotosHeader";
import PhotosButtons from "./PhotosButtons";

function PhotosMain() {
  const [partyDetails, setPartyDetails] = useRecoilState(partyDetailsState);
  const [submit, setSubmit] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function submitParty() {
    fetch(`${config.apiHost}/api/dashboard/my-parties/new/`, {
      method: "post",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        partyDetails,
      }),
    }).then((res) => {
      if (res.ok) setSubmit(true);
    });
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
            alignItems={"space-between"}
            justifyContent={"center"}
            spacing={5}
          >
            <PhotosHeader />
            {!partyDetails.photos.length ? (
              <PhotosCarousel />
            ) : (
              <PhotosCarousel sources={partyDetails.photos} />
            )}
            <PhotosButtons />
          </Stack>
        </Paper>
      </Grid>
    </DashboardTemplate>
  );
}

export default PhotosMain;
