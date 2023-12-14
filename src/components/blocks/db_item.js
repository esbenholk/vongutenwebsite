import React from "react";
import BlockContent from "./BlockContent";
import { Link } from "react-router-dom";

function DBItem({
  year,
  title,
  url,
  description,
  updateVisitedLinks,
  visitedLinks,
}) {
  console.log(
    "DBITEM",
    year,
    title,
    url,
    description,
    updateVisitedLinks,
    visitedLinks
  );
  return (
    <div className="flex-row db_item">
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
            className={`title ${
              visitedLinks.includes(url) ? "visited" : "new"
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

export default DBItem;
