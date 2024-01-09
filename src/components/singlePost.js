import React, { useState, useEffect, useContext } from "react";
import sanityClient from "../client";
import { useParams } from "react-router-dom";
import { HeadTags } from "./blocks/helmetHeaderTags";
import Loader from "./blocks/loader";
import PageBuilder from "./pageBuilder";
import { pageBuilderquerystring } from "../queeries";
import Projects from "./blocks/ProjectSorting";
import AppContext from "../globalState";
import BlockContent from "./blocks/BlockContent";
import { Link } from "react-router-dom";
import BreadContent from "./blocks/BreadContent";

export default function SinglePost({
  CategoryNames,
  PageNames,
  updateSiteColor,
  updateVisitedLinks,
  visitedLinks,
  updateShouldToggleMode,
}) {
  const { slug } = useParams();
  const [project, setproject] = useState();
  const myContext = useContext(AppContext);
  const [mainCategory, setMainCategory] = useState();
  ///get project data, set category names
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  useEffect(() => {
    updateShouldToggleMode(false);

    sanityClient
      .fetch(
        `*[_type == "project" && slug.current == "${slug}"]{ title, headline, year, time, place, client, description, fulldescription, details, slug,year,time, mainImage, heroImage, type, tags, categories[]->{title, slug, color},${pageBuilderquerystring}} `
      )
      .then((data) => {
        console.log("project details", data, slug);
        setproject(data[0]);
        if (data[0].categories) {
          updateSiteColor(data[0].categories[0].color);
          setMainCategory(data[0].categories[0]);
        }
      })
      .catch(console.error);
  }, [slug, updateShouldToggleMode, updateSiteColor]);

  if (!project) return <Loader />;
  return (
    <>
      {project && (
        <>
          <HeadTags
            title={project.title}
            description={project.description}
            image={project.mainImage.asset.url}
          />
          <div className="projectPage singlePost">
            <div className="block">
              <BreadContent
                content={
                  project.fulldescription && project.fulldescription.content
                }
                heading={project.headline && project.headline.content}
                title={project.title}
              />
            </div>
            <div className="flex-row projectdetails projectDetailsListicle fold block">
              <div className="leftMargin"></div>
              <div className="flex-column projectdetailslist centered">
                <div className="flex-row fold">
                  <div className="flex-column">
                    {project.time ? (
                      <div className="flex-column">
                        <p>
                          <strong>Year</strong>
                        </p>
                        <BlockContent blocks={project.time} />
                        <p></p>
                      </div>
                    ) : (
                      <div className="flex-column">
                        <p>
                          <strong>Year</strong>
                        </p>
                        <p>{project.year}</p>
                        <p></p>
                      </div>
                    )}
                    {project.place && (
                      <div className="flex-column">
                        <p>
                          <strong>Location</strong>
                        </p>
                        <p>{project.place}</p>
                        <p></p>
                      </div>
                    )}
                    {project.client && (
                      <div className="flex-column">
                        <p>
                          <strong>Client</strong>
                        </p>
                        <p>{project.client}</p>
                        <p></p>
                      </div>
                    )}
                    {project.categories || project.tags ? (
                      <>
                        {" "}
                        <p>
                          <strong>Category</strong>
                        </p>
                        <div className="flex-row wrap">
                          <Link
                            className={`tag ${
                              visitedLinks.includes(project.categories[0].title)
                                ? "visited"
                                : "new"
                            }`}
                            to={"/" + project.categories[0].slug.current}
                            onClick={(evt) => {
                              updateVisitedLinks(
                                project.categories[0].slug.current
                              );
                            }}
                          >
                            {project.categories[0].title}
                          </Link>
                          {/* {project.categories &&
                            project.categories.map((category, index) => (
                              <Link
                                className={`tag ${
                                  visitedLinks.includes(category.title)
                                    ? "visited"
                                    : "new"
                                }`}
                                key={index}
                                to={"/" + category.slug.current}
                                onClick={(evt) => {
                                  updateVisitedLinks(category.title);
                                }}
                              >
                                {category.title}
                                {index !== project.categories.length - 1 ||
                                index === 0 ||
                                (index === project.categories.length - 1 &&
                                  project.tags.length > 0)
                                  ? ","
                                  : null}
                              </Link>
                            ))} */}
                          {project.tags &&
                            project.tags.map((tag, index) => (
                              <Link
                                className={`tag ${
                                  visitedLinks.includes(tag) ? "visited" : "new"
                                }`}
                                key={index}
                                to={"/" + mainCategory.slug.current + "?" + tag}
                                onClick={(evt) => {
                                  updateVisitedLinks(tag);
                                }}
                              >
                                {tag}
                                {index !== project.tags.length - 1 && ","}
                              </Link>
                            ))}
                        </div>
                      </>
                    ) : null}
                  </div>
                  <div className="flex-column">
                    {project.details && (
                      <BlockContent blocks={project.details} />
                    )}
                  </div>
                </div>
              </div>
            </div>
            {project.pageBuilder && (
              <PageBuilder pageBuilder={project.pageBuilder} />
            )}
          </div>
          <div className="flex-column">
            <Projects
              isproject={true}
              updateVisitedLinks={updateVisitedLinks}
              visitedLinks={visitedLinks}
              projectList={myContext.projectList}
              displayCategoryButton={false}
              displayTagButton={false}
              displayStyle="list"
            />
          </div>
        </>
      )}
    </>
  );
}
