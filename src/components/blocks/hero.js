import React from "react";
import Image, { HeroMobileImage } from "./image";
import useWindowDimensions from "../functions/useWindowDimensions";
import { Link } from "react-router-dom";

function Hero({ image, updateVisitedLinks, url }) {
  const { width, height } = useWindowDimensions();
  return (
    <div className="hero">
      {url ? (
        <Link
          onClick={() => {
            updateVisitedLinks(url);
          }}
          to={"/" + url}
        >
          {width > 900 ? (
            <Image
              image={image}
              width={width}
              height={height}
              class={"hero-image"}
            />
          ) : (
            <HeroMobileImage
              image={image}
              width={width}
              height={height}
              class={"hero-image"}
            />
          )}
        </Link>
      ) : (
        <>
          {" "}
          {width > 900 ? (
            <Image
              image={image}
              width={width}
              height={height}
              class={"hero-image"}
            />
          ) : (
            <HeroMobileImage
              image={image}
              width={width}
              height={height}
              class={"hero-image"}
            />
          )}
        </>
      )}
    </div>
  );
}

export default Hero;
