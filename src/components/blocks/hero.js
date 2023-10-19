import React from "react";
import Image from "./image";
import { SanityImage } from "sanity-image";
import useWindowDimensions from "../functions/useWindowDimensions";

function Hero({ image, tagLine, heading }) {
  const { width } = useWindowDimensions();
  return (
    <div className="hero">
      <Image
        image={image}
        width={1000}
        height={width / 1.77777777778}
        class={"hero-image"}
      />
      <div className="heroContent">
        <h1>{heading}</h1>
        <h2>{tagLine}</h2>
      </div>
    </div>
  );
}

export default Hero;
