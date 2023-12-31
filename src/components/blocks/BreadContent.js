import React from "react";
import BlockContent from "./BlockContent";

function BreadContent({ title, heading, content }) {
  return (
    <div className="flex-row projectdetails fold">
      <div className="flex-column projectheadline leftMargin">
        {heading ? (
          <BlockContent blocks={heading} />
        ) : title ? (
          <h1>{title}</h1>
        ) : null}
      </div>
      <div className="flex-column centered">
        {content && <BlockContent blocks={content} />}
      </div>
    </div>
  );
}

export default BreadContent;
