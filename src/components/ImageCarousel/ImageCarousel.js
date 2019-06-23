import React from "react";
import { Carousel } from "react-bootstrap";
import carousel1 from "../../assets/img/carousel1.jpg";
import carousel2 from "../../assets/img/carousel4.jpg";
import carousel3 from "../../assets/img/carousel2.jpg";
import "./ImageCarousel.css";

const ImageCarousel = prop => {
  return (
    <Carousel className="carousel" id="carousel-container">
      <Carousel.Item>
        <img
          id="image-one"
          className="d-block w-100"
          src={carousel1}
          alt="First slide"
        />

        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          id="image-two"
          className="d-block w-100"
          src={carousel2}
          alt="Third slide"
        />

        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          id="image-three"
          className="d-block w-100"
          src={carousel3}
          alt="Third slide"
        />

        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default ImageCarousel;
