import React from "react";
import PostCard from "./blocks/postCard";

function ConnectedProjects({ projects, heading }) {
  const connectedProjects = projects;

  console.log("Connected projects", connectedProjects);
  return (
    <>
      {heading && <h1>{heading}</h1>}
      <div className="flex-row connectedProjects">
        {connectedProjects &&
          connectedProjects.map((post, index) => (
            <PostCard post={post} key={index} />
          ))}
      </div>
    </>
  );
}

export default ConnectedProjects;
