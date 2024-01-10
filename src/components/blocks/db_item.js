import React, { useState } from "react";
import BlockContent from "./BlockContent";
import { Link } from "react-router-dom";
import useWindowDimensions from "../functions/useWindowDimensions";
import { urlFor } from "./image";
import useMousePosition from "../functions/useMousePosition";
function DBItem({
  year,
  title,
  url,
  description,
  updateVisitedLinks,
  visitedLinks,
  image,
}) {
  const { width } = useWindowDimensions();
  const [isActive, setIsActive] = useState(false);
  const mousePosition = useMousePosition();
  return (
    <div
      className="flex-row db_item"
      onMouseOut={function () {
        setIsActive(false);
      }}
      onMouseOver={function () {
        setIsActive(true);
      }}
      style={{ position: "relative" }}
    >
      <div className="flex-row">
        <div className="year">
          {!Number.isInteger(year) ? (
            <BlockContent blocks={year} />
          ) : (
            <p>{year}</p>
          )}
        </div>
        {url && !url.includes("http") ? (
          <Link
            onMouseOut={function () {
              setIsActive(false);
            }}
            onMouseEnter={function () {
              setIsActive(true);
            }}
            className={`title ${
              visitedLinks && visitedLinks.includes(url) ? "visited" : "new"
            }`}
            to={"/" + url}
            onClick={() => {
              console.log("should update links");
              updateVisitedLinks(url);
            }}
          >
            {title}
          </Link>
        ) : url && url.includes("http") ? (
          <>
            {" "}
            <a
              onMouseOut={function () {
                setIsActive(false);
              }}
              onMouseEnter={function () {
                setIsActive(true);
              }}
              className={`title ${
                visitedLinks && visitedLinks.includes(title) ? "visited" : "new"
              }`}
              href={url}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                console.log("should update links");
                updateVisitedLinks(title);
              }}
            >
              {title}
            </a>
          </>
        ) : (
          <p className="title">{title}</p>
        )}
      </div>
      <div className="description">
        {description && <BlockContent blocks={description} />}
      </div>
      {image && width > 900 && (
        <img
          src={urlFor(image).url()}
          alt={image.alt}
          style={{
            position: "fixed",
            top: mousePosition.y,
            left: mousePosition.x,
            display: `${isActive ? "block" : "none"}`,
            zIndex: 99999999,
            opacity: 1,
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}

export default DBItem;
