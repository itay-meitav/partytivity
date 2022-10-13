import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Lottie from "react-lottie-player";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import config from "../../assets/config";
import CustomLink from "../Link";
import hat from "../../assets/icons/hat.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

type partyDetails = {
  title: string;
  date: string;
  description: string;
  owners: string[];
  photos: string[];
  locationService: string;
  musicService: string;
  foodService: string;
  entertainmentService: string;
};

function PartyInvite() {
  const [animationData, setAnimationData] =
    useState<Record<string | number, any>>();
  const [partyDetails, setPartyDetails] = useState<partyDetails>({
    title: "",
    date: "",
    description: "",
    owners: [],
    photos: [],
    locationService: "",
    musicService: "",
    foodService: "",
    entertainmentService: "",
  });
  const [checkboxes, setCheckboxes] = useState({
    sure: false,
    maybe: false,
  });
  const [msg, setMsg] = useState(false);
  const error =
    Object.values(checkboxes).filter((v) => v === true).length !== 1;

  async function getPartyDetails() {
    const req = await fetch(`${config.apiHost}/invite`);
    const data = await req.json();
    setPartyDetails({
      title: data.title,
      date: data.date.toString(),
      description: data.description,
      owners: data.owners,
      locationService: data.locationService,
      musicService: data.musicService,
      foodService: data.foodService,
      entertainmentService: data.entertainmentService,
      photos: data.photos,
    });
  }

  useEffect(() => {
    getPartyDetails();
    import("./invite.json").then(setAnimationData);
  }, []);

  if (!animationData)
    return (
      <ul className="loader">
        <li className="loader-item"></li>
        <li className="loader-item"></li>
        <li className="loader-item"></li>
      </ul>
    );
  return (
    <div className="partyInvite">
      <Paper className="paper1" elevation={7}>
        If you came here, this is a sign that...
        <br />
        <big>The party is about to begin!</big>
        <br />
        And this time... <br />
        <big>{partyDetails.title}</big> <br />
        By <big>{partyDetails.owners} </big>
        <br />
        {partyDetails.description} <br />
        On <big>{partyDetails.date}</big> <br />
      </Paper>
      <Paper className="paper2" elevation={7}>
        Place: {partyDetails.locationService}
        <br />
        Music by: {partyDetails.musicService}
        <br />
        Food by:{partyDetails.foodService}
        <br />
        On the artistic part: {partyDetails.entertainmentService}
      </Paper>
      <Paper className="paper3" elevation={7}>
        <Carousel width={950}>
          {partyDetails.photos.map((x) => (
            <div>
              <img className="d-block w-100 h-100" src={x} alt="Photo" />
            </div>
          ))}
        </Carousel>
        <br />
        So what are you waiting for?
        <br />
      </Paper>
      <Paper className="paper4" elevation={7}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!error) {
              return;
            } else {
              setMsg(true);
            }
          }}
          className="form"
        >
          Fill in the form below with the details
          <br /> and reserve a place right away!
          <TextField
            type="text"
            id="filled-textarea"
            label="Full Name"
            style={{ width: 200 }}
            placeholder="Your full name"
            required
          />
          <TextField
            type="tel"
            id="filled-textarea"
            label="Phone Number"
            style={{ width: 200 }}
            placeholder="Your phone number"
            required
          />
          <br />
          <FormControl required error={error} variant="standard">
            <FormLabel component="legend">
              How sure are you of coming?
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    disabled={checkboxes.maybe ? true : false}
                    onChange={() =>
                      setCheckboxes({
                        ...checkboxes,
                        sure: !checkboxes.sure,
                      })
                    }
                    color="secondary"
                  />
                }
                label="For Sure"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    disabled={checkboxes.sure ? true : false}
                    onChange={() =>
                      setCheckboxes({
                        ...checkboxes,
                        maybe: !checkboxes.maybe,
                      })
                    }
                    color="secondary"
                  />
                }
                label="Maybe"
              />
            </FormGroup>
            <FormHelperText
              style={msg ? { display: "unset" } : { display: "none" }}
            >
              Pick at least 1 option
            </FormHelperText>
          </FormControl>
          <TextField
            id="filled-textarea"
            label="Comment"
            style={{ width: 400 }}
            placeholder="Any Comment"
            multiline
            minRows={3}
            maxRows={5}
          />
          <Button type="submit" variant="contained" color="secondary">
            Let's go!
          </Button>
        </form>

        {/* <Lottie
            className="invite-animation"
            animationData={animationData}
            play={true}
            loop={true}
          /> */}
      </Paper>
      <Typography
        style={{ marginBottom: 50 }}
        variant="body2"
        color="text.secondary"
        align="center"
      >
        {"Copyright © "}
        <CustomLink
          style={{ color: "inherit", textDecoration: "inherit" }}
          to="/"
        >
          <span style={{ margin: 10 }} className="nav-logo">
            <span className="nav-logo-text custom-font">
              P
              <img
                src={hat}
                className="nav-logo-img custom-icon"
                style={{ height: 15 }}
              />
              RTYTIVITY
            </span>
          </span>
        </CustomLink>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </div>
  );
}

export default PartyInvite;
