import React from "react";
import BlockContent from "./blocks/BlockContent";
import Hero from "./blocks/hero";
import Video from "./blocks/videoPlayer";
import ConnectedProjects from "./connectedProject";
import ConnectedRessources from "./connectedRessources";
import Projects from "./blocks/ProjectSorting";
import Image from "./blocks/image";
import { SquareImage } from "./blocks/squareCard";
import BreadContent from "./blocks/BreadContent";
import { ConstrainedImage } from "./blocks/image";
import useWindowDimensions from "./functions/useWindowDimensions";
function PageBlock({ pageBlock, visitedLinks, updateVisitedLinks }) {
  const { width } = useWindowDimensions();
  return (
    <>
      {pageBlock._type === "sortedProjects" && (
        <Projects sortCategories={pageBlock.categories} />
      )}
      {/* {page.projects ? <HorizontalScroll projects={page.projects} /> : null} */}
      {pageBlock._type === "gallery" && (
        <div className="flex-row wrap align-center blockitem">
          {" "}
          {pageBlock.images.map((image, index) => (
            <SquareImage
              image={image}
              key={index}
              class_name={"instagrampic"}
              width={500}
            />
          ))}
        </div>
      )}
      {pageBlock._type === "hero" && (
        <Hero
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
        />
      )}
      {pageBlock._type === "connectedRessources" && (
        <ConnectedRessources
          ressources={pageBlock.ressources}
          heading={pageBlock.heading}
          type={pageBlock.type}
          updateVisitedLinks={updateVisitedLinks}
          visitedLinks={visitedLinks}
          displayCategoryButton={false}
          displayTagButton={true}
          displayYearButton={true}
        />
      )}
      {pageBlock._type === "expandedBreadContent" && (
        <>
          {pageBlock.content && (
            <div className="blockitem">
              <div className="textblock">
                <BreadContent
                  content={pageBlock.content}
                  heading={pageBlock.heading}
                />
              </div>
            </div>
          )}
        </>
      )}
      {pageBlock._type === "breadContent" && (
        <>
          {pageBlock.content && (
            <div className="blockItem">
              <div className="textBlock">
                <BlockContent
                  blocks={pageBlock.content}
                  heading={pageBlock.heading}
                  readmore={pageBlock.readmorecontent}
                />
              </div>
            </div>
          )}
        </>
      )}
      {pageBlock._type === "customImage" && (
        <div
          className="flex-row align-center block blockitem"
          style={{ width: "100%" }}
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
          className="flex-row justify-center gap fold block blockitem"
          style={{ width: "100%" }}
        >
          {pageBlock.rowContent.map((rowBlock, index) => (
            <div
              key={index}
              className="rowblock"
              style={{
                maxWidth:
                  width > 900 && 100 / pageBlock.rowContent.length + "%",
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
                <div className="textContent">
                  <BlockContent blocks={rowBlock.content} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}{" "}
      {pageBlock._type === "video" && (
        <div className="block blockitem">
          <h1>{pageBlock.title}</h1>
          <Video url={pageBlock.url} cover={pageBlock.cover} />
          <div>
            <BlockContent blocks={pageBlock.description} />
          </div>
        </div>
      )}
    </>
  );
}

function PageBlockContainer({ pageBlock, updateVisitedLinks, visitedLinks }) {
  console.log("PAGEBLOCK", pageBlock);
  return (
    <div
      style={{
        background: `linear-gradient(to bottom, ${pageBlock.color1} 0%, ${pageBlock.color2} 100%)`,
      }}
    >
      {pageBlock._type !== "hero" &&
      pageBlock.title !== null &&
      pageBlock.title !== "" ? (
        <div className="blockItem">
          <h1>{pageBlock.title}</h1>
        </div>
      ) : null}
      {pageBlock.pageBuilder.map((page, index) => (
        <div key={index} className="block">
          <PageBlock
            pageBlock={page}
            updateVisitedLinks={updateVisitedLinks}
            visitedLinks={visitedLinks}
          />
        </div>
      ))}
    </div>
  );
}
export default function PageBuilder({
  pageBuilder,
  updateVisitedLinks,
  visitedLinks,
}) {
  console.log("PAGEBUILDER", pageBuilder);

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
            <PageBlock
              pageBlock={page}
              updateVisitedLinks={updateVisitedLinks}
              visitedLinks={visitedLinks}
            />
          )}
        </div>
      ))}
    </div>
  );
}
