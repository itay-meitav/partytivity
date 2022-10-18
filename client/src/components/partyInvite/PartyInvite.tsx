import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import config from "../../assets/config";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useNavigate, useParams } from "react-router-dom";
import PartyInviteFooter from "./PartyInviteFooter";
import PartyInviteForm from "./PartyInviteForm";

const initialPartyDetails = {
  title: "" as string,
  date: "" as any,
  description: "" as string,
  owner: [] as string[],
  photos: [] as string[],
  locationService: "" as string,
  musicService: "" as string,
  foodService: "" as string,
  entertainmentService: "" as string,
};

function PartyInvite() {
  const [animationData, setAnimationData] =
    useState<Record<string | number, any>>();
  const [partyDetails, setPartyDetails] = useState(initialPartyDetails);
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const req = await fetch(`${config.apiHost}/api/invite`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ partyToken: token }),
      });
      if (!req.ok) {
        navigate("/welcome");
      }
      const data = await req.json();
      setPartyDetails(data.partyDetails);
    })();
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
        By <big>{partyDetails.owner} </big>
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
      {/* <Lottie
            className="invite-animation"
            animationData={animationData}
            play={true}
            loop={true}
          /> */}
      <PartyInviteForm />
      <PartyInviteFooter />
    </div>
  );
}

export default PartyInvite;
