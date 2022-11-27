import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

type TProps = {
  sources: string[];
};

function PhotosCarousel(props: TProps) {
  if (props.sources.length) {
    return (
      <Carousel className="photosCarousel">
        {props.sources.map((x: string, i: number) => (
          <div key={i}>
            <img className="d-block w-100 h-100" src={x} alt="Photo" />
          </div>
        ))}
      </Carousel>
    );
  }
  return (
    <Carousel className="photosCarousel">
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

export default PhotosCarousel;
