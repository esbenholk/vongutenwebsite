import React, { useEffect, useState, useContext } from "react";
import sanityClient from "../client";
import { useParams, useSearchParams } from "react-router-dom";
import Projects from "./blocks/ProjectSorting";
import AppContext from "../globalState";
import ConnectedProjects from "./connectedProject";
import Loader from "./blocks/loader";
import useWindowDimensions from "./functions/useWindowDimensions";

function CustomDropdown({ options, onSelect, currentOption }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const { width } = useWindowDimensions();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="custom-dropdown">
      <div
        className={`dropdown-toggle ${isOpen ? "open" : ""}`}
        onClick={toggleDropdown}
      >
        {selectedOption ? (
          <div className="selected-option">
            {width < 900 ? (
              <img
                src={process.env.PUBLIC_URL + selectedOption.imageSrc}
                alt={selectedOption.label}
              />
            ) : (
              <p>{selectedOption.label}</p>
            )}
          </div>
        ) : (
          <div className="selected-option">
            {width < 900 ? (
              <img
                src={process.env.PUBLIC_URL + currentOption.imageSrc}
                alt={currentOption.label}
              />
            ) : (
              <p>{currentOption.label}</p>
            )}
          </div>
        )}
      </div>
      <ul className={`dropdown-options ${isOpen ? "open" : ""}`}>
        {options.map((option, index) => (
          <li
            className=""
            key={index}
            onClick={() => handleOptionClick(option)}
          >
            {width < 900 ? (
              <img
                src={process.env.PUBLIC_URL + option.imageSrc}
                alt={option.label}
              />
            ) : (
              <p> {option.label}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Category({
  visitedLinks,
  updateVisitedLinks,
  updateSiteColor,
  updateShouldToggleMode,
  updateSiteSound,
}) {
  const { slug } = useParams();
  const [searchSlug, setSearchSlug] = useState();
  const [searchParams] = useSearchParams();

  const [mode, setMode] = useState("Database View");
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
          audio{asset->{url}},
          connectedProjects{_type, heading,type, projects[]->{title, year, time, place, slug, mainImage, heroImage, featuredImage}}
        }`
      )
      .then((data) => {
        setCategory(data[0]);

        if (data[0]) {
          updateSiteColor(data[0].color);
          if (data[0].audio) {
            console.log("has sound maybe:", data[0]);

            updateSiteSound(data[0].audio.asset.url);
          }
        }
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
  }, [
    slug,
    searchParams,
    updateShouldToggleMode,
    updateSiteColor,
    updateSiteSound,
  ]);

  for (var i = 0; i < projectList.length; i++) {
    var project = projectList[i];
    if (
      project.categories.find(
        (category) => category.title.toLowerCase() === slug
      )
    ) {
      sortedProjectList.push(project);
    }
  }

  const options = [
    { label: "Database View", imageSrc: "assets/databaseview.png" },
    { label: "FullPage View", imageSrc: "assets/fullwidth.png" },
    { label: "Grid View", imageSrc: "assets/grid.png" },
  ];
  const handleOptionSelect = (option) => {
    setMode(option.label);
    console.log("sets mode", mode);
  };

  if (!category) return <Loader />;

  return (
    <>
      <CustomDropdown
        options={options}
        onSelect={handleOptionSelect}
        currentOption={options.find((option) => option.label === mode)}
      />

      <div className="projectPage ">
        {mode === "Database View" ? (
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
        ) : mode === "Grid View" ? (
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
