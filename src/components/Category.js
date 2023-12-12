import React, { useEffect, useState, useContext } from "react";
import sanityClient from "../client";
import { useParams } from "react-router-dom";
import Projects from "./blocks/ProjectSorting";

import AppContext from "../globalState";

export default function Category({
  CategoryNames,
  PageNames,
  visitedLinks,
  updateVisitedLinks,
  updateSiteColor,
}) {
  const { slug } = useParams();

  const [category, setCategory] = useState();
  const myContext = useContext(AppContext);
  const projectList = myContext.projectList;
  const sortedProjectList = [];

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "category" && slug.current=="${slug}"]{
          description,
          title, 
          slug, 
          color,
          connectedProjects{_type, heading,type, projects[]->{title, year, time, place, slug, logoImage, mainImage, heroImage}}
        }`
      )
      .then((data) => {
        setCategory(data[0]);
        console.log("CATEGORY PAGE", data[0]);

        updateSiteColor(data[0].color);
      })
      .catch(console.error);
  }, [slug]);

  for (var i = 0; i < projectList.length; i++) {
    var project = projectList[i];
    console.log(project, slug);
    if (
      project.categories.find(
        (category) => category.title.toLowerCase() == slug
      )
    ) {
      sortedProjectList.push(project);
    }
  }
  return (
    <>
      <div style={{ minHeight: "100vh" }}>
        {sortedProjectList.length > 1 && (
          <div className="content-container ">
            <Projects
              updateVisitedLinks={updateVisitedLinks}
              visitedLinks={visitedLinks}
              projectList={sortedProjectList}
              displayCategoryButton={false}
              displayTagButton={true}
              displayStyle="list"
            />
          </div>
        )}
      </div>
    </>
  );
}
