import React, { useEffect, useState } from "react";
import config from "../../assets/config";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useNavigate, useParams } from "react-router-dom";
import PartyInviteFooter from "./PartyInviteFooter";
import PartyInviteForm from "./PartyInviteForm";
import dayjs from "dayjs";
import Lottie from "react-lottie-player";
import discoBallSvg from "../../assets/icons/discoBallSvg.svg";
import { useSetRecoilState } from "recoil";
import { linkTransitionState } from "../Link";
import {
  EmailShareButton,
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

const initialPartyDetails = {
  title: "" as string,
  date: "" as any,
  description: "" as string,
  partyOwner: "" as string,
  photos: [] as string[],
  locationService: "" as string,
  musicService: "" as string,
  foodService: "" as string,
  entertainmentService: "" as string,
};

function PartyInvite() {
  const setLinkTransition = useSetRecoilState(linkTransitionState);
  const [sparklesAnimation, setSparklesAnimation] =
    useState<Record<string | number, any>>();
  const [partyAnimation, setPartyAnimation] =
    useState<Record<string | number, any>>();
  const [partyDetails, setPartyDetails] = useState(initialPartyDetails);
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${config.apiHost}/api/invite/${token}`).then(async (res) => {
      const data = await res.json();
      if (res.ok) {
        data.partyDetails.date = dayjs(data.partyDetails.date).format(
          "dddd MMMM DD, LT \nDD/MM/YYYY"
        );
        setPartyDetails(data.partyDetails);
      } else {
        navigate("/welcome");
      }
    });
    import("./sparkles.json").then(setSparklesAnimation);
    import("../welcome/dance-party.json").then(setPartyAnimation);
    setLinkTransition("fade-in");
  }, []);

  if (!sparklesAnimation || !partyAnimation)
    return (
      <div className="loader loaderCenter">
        <div className="loader-item"></div>
        <div className="loader-item"></div>
        <div className="loader-item"></div>
      </div>
    );
  return (
    <div className="partyInvite">
      <div className="upperSection">
        <div className="upperLeftSection">
          <p>If you came here, this is a sign that</p>
          <div className="upperText">
            <big id="begin">The party is about to begin!</big>
            <p>And this time... </p>
            <big id="title">{partyDetails.title}</big>
          </div>
          <p>
            By <big>{partyDetails.partyOwner}</big>
          </p>
          <big style={{ whiteSpace: "pre" }}>{partyDetails.date}</big>
        </div>
        <div className="upperRightSection">
          <div style={{ height: 150 }} />
          <div className="discoBall">
            <img style={{ width: 150, height: 150 }} src={discoBallSvg} />
            <Lottie
              style={{ width: 100 }}
              animationData={sparklesAnimation}
              play
              loop
            />
          </div>
          {partyDetails.photos.length ? (
            <Carousel
              width={"100%"}
              showThumbs={false}
              showStatus={false}
              showArrows={false}
              interval={4000}
              infiniteLoop
              autoPlay
            >
              {partyDetails.photos.map((x) => (
                <div>
                  <img
                    className="d-block w-100 h-100"
                    style={{ borderRadius: 10 }}
                    src={x}
                    alt="Photo"
                  />
                </div>
              ))}
            </Carousel>
          ) : (
            <Lottie
              className="partyAnimation"
              animationData={partyAnimation}
              play={true}
              loop={true}
            />
          )}
          {/* <p>{partyDetails.description}</p>
          Place: {partyDetails.locationService || "currently none"}
          <br />
          Music by: {partyDetails.musicService || "currently none"}
          <br />
          Food by: {partyDetails.foodService || "currently none"}
          <br />
          On the artistic part:{" "}
          {partyDetails.entertainmentService || "currently none"} */}
        </div>
      </div>
      <PartyInviteForm />
      <PartyInviteFooter />
    </div>
  );
}

export default PartyInvite;
