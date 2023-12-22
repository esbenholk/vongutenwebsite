import React from "react";
import PostCard from "./blocks/postCard";

function ConnectedProjects({ projects, heading, type }) {
  const connectedProjects = projects;

  console.log("Connected projects", connectedProjects, type);
  return (
    <>
      {heading && <h1>{heading}</h1>}
      <div className="flex-row connectedProjects">
        {connectedProjects &&
          connectedProjects.map((post, index) => (
            <PostCard post={post} key={index} type={type} />
          ))}
      </div>
    </>
  );
}

export default ConnectedProjects;
