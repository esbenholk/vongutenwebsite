import React from "react";
import sanityClient from "../../client";
import { Link } from "react-router-dom";

import imageUrlBuilder from "@sanity/image-url";
// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

export default function PostCard({ post, class_name }) {
  return (
    <div className="post_card">
      {/* <Link to={post.slug.current} className="w-full teaser-link">
        <h1 className="noMargin">{post.title}</h1>
      </Link> */}

      {post.mainImage && (
        <Link to={"/" + post.slug.current}>
          {post.mainImage.hotspot ? (
            <img
              src={urlFor(post.mainImage).height(511).url()}
              alt={post.mainImage.alt}
              style={{
                objectPosition: `${post.mainImage.hotspot.x * 100}% ${
                  post.mainImage.hotspot.y * 100
                }%`,
              }}
              className={class_name}
            />
          ) : (
            <img
              src={urlFor(post.mainImage).height(511).url()}
              alt={post.mainImage.alt}
              className={class_name}
            />
          )}
        </Link>
      )}
    </div>
  );
}
