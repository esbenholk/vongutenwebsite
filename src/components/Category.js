import React, { useEffect, useState, useContext } from "react";
import sanityClient from "../client";
import { useParams, useSearchParams } from "react-router-dom";
import Projects from "./blocks/ProjectSorting";
import AppContext from "../globalState";
import ConnectedProjects from "./connectedProject";
import Loader from "./blocks/loader";

export default function Category({
  visitedLinks,
  updateVisitedLinks,
  updateSiteColor,
  updateShouldToggleMode,
}) {
  const { slug } = useParams();
  const [searchSlug, setSearchSlug] = useState();
  const [searchParams] = useSearchParams();

  const [mode, setMode] = useState("list");
  const [category, setCategory] = useState();
  const myContext = useContext(AppContext);
  const projectList = myContext.projectList;
  const sortedProjectList = [];

  useEffect(() => {
    updateShouldToggleMode(true);
    sanityClient
      .fetch(
        `*[_type == "category" && slug.current=="${slug}"]{
          description,
          title,
          slug,
          color,
          connectedProjects{_type, heading,type, projects[]->{title, year, time, place, slug, mainImage, heroImage, featuredImage}}
        }`
      )
      .then((data) => {
        setCategory(data[0]);
        console.log("CATEGORY PAGE", data[0]);

        updateSiteColor(data[0].color);
      })
      .catch(console.error);

    const params = [];

    searchParams.forEach((value, key) => {
      params.push([key, value]);
    });
    for (let index = 0; index < params.length; index++) {
      const element = params[index];
      if (element.length > 1) {
        setSearchSlug(element);
      }
    }
  }, [slug, searchParams, updateShouldToggleMode, updateSiteColor]);

  for (var i = 0; i < projectList.length; i++) {
    var project = projectList[i];
    console.log("CHECKS PROJECT", project, slug);
    if (
      project.categories.find(
        (category) => category.title.toLowerCase() === slug
      )
    ) {
      sortedProjectList.push(project);
      console.log("PUSHES PROJECT TO CAT", sortedProjectList);
    }
  }

  if (!category) return <Loader />;

  return (
    <>
      <select
        name="modeSelecting"
        id="modeSelecting"
        className="custom-select menu_link "
        onChange={(evt) => {
          console.log("SETS MODE", evt.currentTarget.value);
          setMode(evt.currentTarget.value);
        }}
      >
        {/* <option className="sortingButton" id={"year_AllTime"} value={"AllTime"}>
          Mode
        </option> */}
        <option value={"list"}>DataBase Mode</option>
        <option value={"fullpage"}>FullPage Mode</option>
        <option value={"grid"}>Grid Mode</option>
      </select>

      <div className="projectPage ">
        {mode === "list" ? (
          <>
            {" "}
            {category && category.connectedProjects ? (
              <>
                {" "}
                <ConnectedProjects
                  projects={category.connectedProjects.projects}
                  heading={category.connectedProjects.heading}
                  type={category.connectedProjects.type}
                />
              </>
            ) : null}
            <div>
              {sortedProjectList.length > 0 && (
                <div className="content-container ">
                  <Projects
                    updateVisitedLinks={updateVisitedLinks}
                    visitedLinks={visitedLinks}
                    projectList={sortedProjectList}
                    displayCategoryButton={false}
                    displayTagButton={true}
                    displayStyle="list"
                    displayYearButton={true}
                    highlightedTag={searchSlug ? searchSlug[0] : null}
                    isproject={true}
                  />
                </div>
              )}
            </div>
          </>
        ) : mode === "grid" ? (
          <div>
            {sortedProjectList.length > 0 && (
              <div className="content-container ">
                <Projects
                  updateVisitedLinks={updateVisitedLinks}
                  visitedLinks={visitedLinks}
                  projectList={sortedProjectList}
                  displayCategoryButton={false}
                  displayTagButton={true}
                  displayStyle="grid"
                  displayYearButton={true}
                  isproject={true}
                  highlightedTag={searchSlug ? searchSlug[0] : null}
                />
              </div>
            )}
          </div>
        ) : (
          <div>
            {sortedProjectList.length > 0 && (
              <div className="content-container ">
                <Projects
                  isproject={true}
                  updateVisitedLinks={updateVisitedLinks}
                  visitedLinks={visitedLinks}
                  projectList={sortedProjectList}
                  displayCategoryButton={false}
                  displayTagButton={true}
                  displayStyle="fullpage"
                  displayYearButton={true}
                  highlightedTag={searchSlug ? searchSlug[0] : null}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
