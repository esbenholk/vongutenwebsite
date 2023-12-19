import React from "react";
import Image from "./image";
import useWindowDimensions from "../functions/useWindowDimensions";
import { Link } from "react-router-dom";

function Hero({ image, updateVisitedLinks, url }) {
  const { width, height } = useWindowDimensions();
  return (
    <div className="hero blockitem">
      <Link
        onClick={() => {
          updateVisitedLinks(url);
        }}
        to={"/" + url}
      >
        <Image
          image={image}
          width={width}
          height={height}
          class={"hero-image"}
        />
      </Link>
    </div>
  );
}

export default Hero;
