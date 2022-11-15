import { Grid, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import config from "../../../assets/config";
import PartyDetailsHeading from "./PartyDetailsHeading";
import { atom, useRecoilState } from "recoil";
import { Dayjs } from "dayjs";
import PartyDetailsBasic from "./PartyDetailsBasic";
import PartyPhotos from "./PartyPhotos";

export const partyDetailsState = atom({
  key: "partyDetails",
  default: JSON.parse(localStorage.getItem("details")!) || {
    title: "" as string,
    des: "" as string,
    date: null as Dayjs | null,
    collaborators: [] as string[],
    services: {
      entertainmentService: "" as string,
      foodService: "" as string,
      musicService: "" as string,
      generalService: "" as string,
      locationService: "" as string,
    },
    photos: [] as string[],
  },
});

function PartyDetailsMain() {
  const [partyDetails, setPartyDetails] = useRecoilState(partyDetailsState);
  const { partyTitle } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${config.apiHost}/api/dashboard/my-parties/${partyTitle}`, {
      credentials: "include",
    }).then(async (res) => {
      const data = await res.json();
      setPartyDetails(data.partyDetails);
    });
  }, []);

  return (
    <Grid item xs={12}>
      <Paper className="partyDetails" elevation={2}>
        <PartyDetailsHeading />
        <Typography color="text.secondary">Basic Information</Typography>
        <PartyDetailsBasic />
        <Typography color="text.secondary">Party Photos</Typography>
        <PartyPhotos sources={partyDetails.photos} />
      </Paper>
    </Grid>
  );
}

export default PartyDetailsMain;
