import React, { useState } from "react";
import Image, { HeroMobileImage } from "./image";
import useWindowDimensions from "../functions/useWindowDimensions";
import { Link } from "react-router-dom";
import BlockContent from "./BlockContent";

function Hero({ image, updateVisitedLinks, url, post }) {
  const { width, height } = useWindowDimensions();
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={isActive ? "hero active" : "hero"}
      onMouseOut={function () {
        setIsActive(false);
      }}
      onMouseEnter={function () {
        setIsActive(true);
      }}
    >
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

      <div
        className={isActive ? "post_card_overlay active" : "post_card_overlay"}
      >
        {" "}
        <p className="noMargin">{post.title}</p>
        {post.time ? <BlockContent blocks={post.time} /> : <p>{post.year}</p>}
      </div>
    </div>
  );
}

export default Hero;
