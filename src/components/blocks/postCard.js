import React, { useState } from "react";
import sanityClient from "../../client";
import { Link } from "react-router-dom";
import BlockContent from "./BlockContent";

import imageUrlBuilder from "@sanity/image-url";
// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

export default function PostCard({ post, class_name }) {
  const [isActive, setIsActive] = useState(false);
  return (
    <Link
      className="post_card"
      to={"/" + post.slug.current}
      onMouseOut={function () {
        setIsActive(false);
      }}
      onMouseEnter={function () {
        setIsActive(true);
      }}
    >
      <div
        className={isActive ? "post_card_overlay active" : "post_card_overlay"}
      >
        <p className="noMargin">{post.title}</p>
        {post.time ? <BlockContent blocks={post.time} /> : <p>{post.year}</p>}
      </div>
      {post.featuredImage ? (
        <>
          {" "}
          <img
            src={urlFor(post.featuredImage).height(511).url()}
            alt={post.featuredImage.alt}
            style={{
              objectPosition:
                post.featuredImage.hotspot &&
                `${post.featuredImage.hotspot.x * 100}% ${
                  post.featuredImage.hotspot.y * 100
                }%`,
            }}
            className={class_name}
          />
        </>
      ) : (
        <>
          {" "}
          <img
            src={urlFor(post.mainImage).height(511).url()}
            alt={post.mainImage.alt}
            style={{
              objectPosition:
                post.mainImage.hotspot &&
                `${post.mainImage.hotspot.x * 100}% ${
                  post.mainImage.hotspot.y * 100
                }%`,
            }}
            className={class_name}
          />
        </>
      )}
    </Link>
  );
}
