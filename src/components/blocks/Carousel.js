import React from "react";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useWindowDimensions from "../functions/useWindowDimensions";
import { SquareImage } from "./squareCard";
// import Masonry from "react-responsive-masonry";

export default function CustomCarousel({ images, classsss, description }) {
  const { width } = useWindowDimensions();
  return (
    <div className="carouselContainer">
      {width < 900 ? (
        <Carousel
          swipeable={true}
          preventMovementUntilSwipeScrollTolerance
          axis={"horizontal"}
          swipeScrollTolerance={5}
          stopOnHover={true}
          showIndicators={false}
          emulateTouch={true}
          showStatus={false}
          interval={6000}
          showThumbs={false}
          showArrows={true}
          className={`carousel ${classsss}`}
          infiniteLoop={false}
          // selectedItem={currentIndex}
          renderArrowPrev={(clickHandler, hasPrev, labelPrev) =>
            hasPrev && (
              <button
                onClick={(e) => {
                  clickHandler();
                }}
                className="featuredCardArrow prevArrow"
              >
                <img
                  style={{
                    height: "50px",
                    // width: "30px",
                    // transform: "rotate(180deg)",
                  }}
                  className={"blacksvgturnwhite"}
                  src={`../assets/Left.svg`}
                  alt="prevArrow"
                />
              </button>
            )
          }
          renderArrowNext={(clickHandler, hasNext, labelNext) =>
            hasNext && (
              <button
                // onClick={clickHandler}
                className="featuredCardArrow nextArrow"
                onClick={(e) => {
                  clickHandler();
                }}
              >
                <img
                  style={{
                    height: "50px",
                    // width: "30px"
                  }}
                  className={"blacksvgturnwhite"}
                  src={`../assets/Right.svg`}
                  alt="nextArrow"
                />
              </button>
            )
          }
        >
          {images.map((image, index) => (
            <SquareImage
              image={image}
              key={index}
              class_name={"instagrampic"}
              width={width}
            />
          ))}
        </Carousel>
      ) : (
        <div className="flex-row justify-center align-center block wrap">
          {images.map((image, index) => (
            <SquareImage
              image={image}
              key={index}
              class_name={"instagrampic"}
              // width={700}
            />
          ))}
        </div>
      )}
      {description && <p className="smallp">{description}</p>}{" "}
    </div>
  );
}
