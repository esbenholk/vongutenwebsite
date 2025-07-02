import React from "react";
import BlockContent from "./blocks/BlockContent";
import { StaticHero } from "./blocks/hero";
import Video from "./blocks/videoPlayer";
import ConnectedProjects from "./connectedProject";
import ConnectedRessources from "./connectedRessources";
import Projects from "./blocks/ProjectSorting";
import Image from "./blocks/image";
import { SquareImage } from "./blocks/squareCard";
import { ConstrainedImage } from "./blocks/image";
import useWindowDimensions from "./functions/useWindowDimensions";
import CustomCarousel from "./blocks/Carousel";
import DBItem from "./blocks/db_item";

function PageBlock({ pageBlock, visitedLinks, updateVisitedLinks }) {
  const { width } = useWindowDimensions();
  return (
    <>
      {pageBlock._type === "sortedProjects" && (
        <Projects sortCategories={pageBlock.categories} />
      )}
      {pageBlock._type === "gallery" && (
        <>
          <div className="gallery">
            {pageBlock.images ? (
              <>
                <CustomCarousel images={pageBlock.images} />
              </>
            ) : null}
          </div>
        </>
      )}
      {pageBlock._type === "hero" && (
        <StaticHero
          image={pageBlock.image}
          heading={pageBlock.heading}
          tagLine={pageBlock.tagline}
          type={pageBlock.image.type}
        />
      )}
      {pageBlock._type === "connectedProjects" && (
        <ConnectedProjects
          projects={pageBlock.projects}
          heading={pageBlock.heading}
          type={pageBlock.type}
          updateVisitedLinks={updateVisitedLinks}
          visitedLinks={visitedLinks}
        />
      )}
      {pageBlock._type === "connectedRessources" && (
        <ConnectedRessources
          ressources={pageBlock.ressources}
          heading={pageBlock.heading}
          categories={pageBlock.category}
          types={pageBlock}
          updateVisitedLinks={updateVisitedLinks}
          visitedLinks={visitedLinks}
          displayCategoryButton={true}
          displayTagButton={true}
          displayYearButton={true}
        />
      )}
      {pageBlock._type === "connectedRandoms" && (
        <>
          <div className="flex-column">
            {" "}
            {pageBlock.heading && (
              <h1 className="heading">{pageBlock.heading}</h1>
            )}
            {pageBlock.randoms && pageBlock.randoms.length > 0 && (
              <div className="list">
                {pageBlock.randoms.map((project, index) => (
                  <DBItem
                    key={index}
                    url={project.link}
                    title={project.title}
                    year={project.time ? project.time : project.year}
                    description={project.description}
                    updateVisitedLinks={updateVisitedLinks}
                    visitedLinks={visitedLinks}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}
      {pageBlock._type === "expandedBreadContent" && (
        <div className="block">
          {pageBlock.content && <BlockContent blocks={pageBlock.content} />}
        </div>
      )}
      {pageBlock._type === "breadContent" && (
        <>
          {pageBlock.content && (
            <div className="textBlock">
              <BlockContent blocks={pageBlock.content} />
            </div>
          )}
        </>
      )}
      {pageBlock._type === "customImage" && (
        <div
          className="flex-row align-center blockitem"
          style={{ maxWidth: "100%" }}
        >
          <div className="flex-column align-center">
            <Image image={pageBlock.customImage} />
            {pageBlock.customImage.imageDescription && (
              <p>{pageBlock.customImage.imageDescription}</p>
            )}
          </div>
        </div>
      )}
      {pageBlock._type === "row" && (
        <div
          className={`flex-row block gap  ${pageBlock.fold && "fold"}`}
          style={{ maxWidth: "100%" }}
        >
          {pageBlock.rowContent &&
            pageBlock.rowContent.map((rowBlock, index) => (
              <div
                key={index}
                className="rowblock"
                style={{
                  maxWidth:
                    width > 900 && 100 / pageBlock.rowContent.length + "%",
                  // width:
                  //   width > 900 &&
                  //   pageBlock.fill &&
                  //   100 / pageBlock.rowContent.length + "%",
                }}
              >
                {rowBlock.customImage && (
                  <div className="flex-column align-center">
                    <ConstrainedImage image={rowBlock.customImage} />
                    {rowBlock.customImage.imageDescription && (
                      <p>{rowBlock.customImage.imageDescription}</p>
                    )}
                  </div>
                )}
                {rowBlock.content && (
                  <div
                    className={`textContent ${
                      rowBlock.type === "explanationtext" && "minimisedtext"
                    }`}
                  >
                    <BlockContent blocks={rowBlock.content} />
                  </div>
                )}
                {rowBlock.images && (
                  <div className="flex-row wrap rowGallery">
                    {rowBlock.images &&
                      rowBlock.images.map((image, index) => (
                        <SquareImage
                          image={image}
                          key={index}
                          class_name={"instagrampic"}
                          // width={350}
                        />
                      ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      )}{" "}
      {pageBlock._type === "video" && (
        <>
          <h1>{pageBlock.title}</h1>
          <Video url={pageBlock.url} cover={pageBlock.cover} width={width} />

          {pageBlock.description && (
            <div>
              {" "}
              <BlockContent blocks={pageBlock.description} />
            </div>
          )}
        </>
      )}
    </>
  );
}

function PageBlockContainer({ pageBlock, updateVisitedLinks, visitedLinks }) {
  return (
    <div className="blockitem">
      {pageBlock.type === "fullwidth" ? (
        <div className="fullwidthblockitem">
          {pageBlock._type !== "hero" && pageBlock.title ? (
            <div className="headline">
              <BlockContent blocks={pageBlock.title} />
            </div>
          ) : null}
          {pageBlock.pageBuilder &&
            pageBlock.pageBuilder.map((page, index) => (
              <div key={index}>
                <PageBlock
                  pageBlock={page}
                  updateVisitedLinks={updateVisitedLinks}
                  visitedLinks={visitedLinks}
                />
              </div>
            ))}
        </div>
      ) : (
        <div className="fullwidthblockitem">
          <div className="flex-row fullwidth fold">
            <div className="flex-column projectheadline leftMargin">
              {pageBlock._type !== "hero" && pageBlock.title ? (
                <div className="blockItem headline">
                  <BlockContent blocks={pageBlock.title} />
                </div>
              ) : null}
            </div>
            <div className="flex-column centered">
              {pageBlock.pageBuilder &&
                pageBlock.pageBuilder.map((page, index) => (
                  <div key={index}>
                    <PageBlock
                      pageBlock={page}
                      updateVisitedLinks={updateVisitedLinks}
                      visitedLinks={visitedLinks}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default function PageBuilder({
  pageBuilder,
  updateVisitedLinks,
  visitedLinks,
}) {
  return (
    <div>
      {pageBuilder.map((page, index) => (
        <div key={index}>
          {page._type === "pageBlock" ? (
            <PageBlockContainer
              pageBlock={page}
              updateVisitedLinks={updateVisitedLinks}
              visitedLinks={visitedLinks}
            />
          ) : (
            <>
              <PageBlock
                pageBlock={page}
                updateVisitedLinks={updateVisitedLinks}
                visitedLinks={visitedLinks}
              />
            </>
          )}
        </div>
      ))}
    </div>
  );
}
