import React from "react";
import BlockContent from "./BlockContent";
import { Link } from "react-router-dom";

function DB_Item({
  year,
  title,
  url,
  description,
  updateVisitedLinks,
  visitedLinks,
}) {
  return (
    <div className="flex-row db_item">
      <div className="flex-row">
        <div className="year">{year && <BlockContent blocks={year} />}</div>
        {url && !url.includes("http") ? (
          <Link
            className={`title ${
              visitedLinks.includes(title) ? "visited" : "new"
            }`}
            to={url}
            onClick={() => {
              console.log("should update links");
              updateVisitedLinks(title);
            }}
          >
            {title}
          </Link>
        ) : url.includes("http") ? (
          <>
            {" "}
            <a
              className={`title ${
                visitedLinks.includes(title) ? "visited" : "new"
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
    </div>
  );
}

export default DB_Item;
