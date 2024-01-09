import React, { useState } from "react";
import sanityClient from "../../client";
import { Link } from "react-router-dom";
import BlockContent from "./BlockContent";
import imageUrlBuilder from "@sanity/image-url";
import Image from "./image";
const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

export function SquareCard({ post, width }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="cube_card">
      {post.mainImage && (
        <Link to={"/" + post.slug.current}>
          <img
            onMouseOut={function () {
              setIsActive(false);
            }}
            onMouseEnter={function () {
              setIsActive(true);
            }}
            src={urlFor(post.mainImage).height(width).url()}
            alt={post.mainImage.alt}
            style={{
              objectPosition:
                post.mainImage.hotspot &&
                `${post.mainImage.hotspot.x * 100}% ${
                  post.mainImage.hotspot.y * 100
                }%`,
              width: width,
            }}
            className={isActive ? "instagrampic blur" : "instagrampic"}
          />
        </Link>
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

export function SquareImage({ image, class_name, width }) {
  return (
    <div className="cubedImage">
      <Image image={image} width={width} class={class_name} cubed={true} />
    </div>
  );
}
