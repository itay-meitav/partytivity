import { Typography } from "@mui/material";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useRecoilState } from "recoil";
import { partyDetailsState } from "./PartyDetailsMain";

type TProps = {
  sources: string[];
};

function PartyPhotos(props: TProps) {
  const [partyDetails, setPartyDetails] = useRecoilState(partyDetailsState);

  if (props.sources.length) {
    return (
      <Carousel width={"80%"} className="partyPhotos" showThumbs={false}>
        {props.sources.map((x: string, i: number) => (
          <div key={i}>
            <img className="d-block w-100 h-100" src={x} alt="Photo" />
          </div>
        ))}
      </Carousel>
    );
  }
  return (
    <Carousel width={"80%"} className="partyPhotos" showThumbs={false}>
      <div>
        <img
          className="d-block w-100 h-100"
          src="https://via.placeholder.com/800x400/eee?text=Image1"
          alt="Photo"
        />
      </div>
      <div>
        <img
          className="d-block w-100 h-100"
          src="https://via.placeholder.com/800x400/eee?text=Image2"
          alt="Photo"
        />
      </div>
      <div>
        <img
          className="d-block w-100 h-100"
          src="https://via.placeholder.com/800x400/eee?text=Image3"
          alt="Photo"
        />
      </div>
      <div>
        <img
          className="d-block w-100 h-100"
          src="https://via.placeholder.com/800x400/eee?text=Image4"
          alt="Photo"
        />
      </div>
    </Carousel>
  );
}

export default PartyPhotos;
