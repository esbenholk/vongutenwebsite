import React, { useState, useRef } from "react";
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
  const cursorimg = useRef(null);

  function closeOtherCursorImg() {
    let cursorImages = document.getElementsByClassName("cursorimg");

    if (cursorImages) {
      for (let index = 0; index < cursorImages.length; index++) {
        const cursorImage = cursorImages[index];
        if (cursorImage !== cursorimg.current) {
          cursorImage.style.display = "none";
        }
      }
    }
  }
  return (
    <div
      className="flex-row db_item"
      onMouseOut={function () {
        setIsActive(false);
      }}
      onMouseEnter={function () {
        setIsActive(true);
        closeOtherCursorImg();
      }}
      style={{ position: "relative" }}
    >
      <div className="flex-row">
        {year && (
          <div className="year">
            {!Number.isInteger(year) ? (
              <BlockContent blocks={year} />
            ) : (
              <p>{year}</p>
            )}
          </div>
        )}

        {url && !url.includes("http") ? (
          <Link
            className={`title ${
              visitedLinks && visitedLinks.includes(url) ? "visited" : "new"
            }`}
            to={"" + url}
            onClick={() => {
              console.log("should update links");
              updateVisitedLinks(url);
            }}
            onMouseOut={function () {
              setIsActive(false);
            }}
            onMouseEnter={function () {
              setIsActive(true);
              closeOtherCursorImg();
            }}
          >
            {title}
          </Link>
        ) : url && url.includes("http") ? (
          <>
            {" "}
            <a
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
              onMouseOut={function () {
                setIsActive(false);
              }}
              onMouseEnter={function () {
                setIsActive(true);
                closeOtherCursorImg();
              }}
            >
              {title}
            </a>
          </>
        ) : (
          <p className="title">{title}</p>
        )}
      </div>
      <div
        className={year ? "description hasyear" : "description"}
        onMouseOut={function () {
          setIsActive(false);
        }}
        onMouseEnter={function () {
          setIsActive(true);
          closeOtherCursorImg();
        }}
      >
        {description && <BlockContent blocks={description} />}
      </div>
      {image && width > 900 && (
        <img
          ref={cursorimg}
          src={urlFor(image).url()}
          alt={image.alt}
          className={`cursorimg ${isActive ? "block" : "none"}`}
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
