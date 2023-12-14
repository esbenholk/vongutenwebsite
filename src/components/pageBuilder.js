import React from "react";
import BlockContent from "./blocks/BlockContent";
import Hero from "./blocks/hero";
import Video from "./blocks/videoPlayer";
import ConnectedProjects from "./connectedProject";
import Projects from "./blocks/ProjectSorting";
import Image from "./blocks/image";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import BreadContent from "./blocks/BreadContent";

function PageBlock({ pageBlock, visitedLinks, updateVisitedLinks }) {
  return (
    <>
      {pageBlock._type === "sortedProjects" && (
        <Projects sortCategories={pageBlock.categories} />
      )}
      {/* {page.projects ? <HorizontalScroll projects={page.projects} /> : null} */}
      {pageBlock._type === "gallery" && (
        <>
          {pageBlock.images ? (
            <>
              <ResponsiveMasonry
                columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
              >
                <Masonry>
                  {pageBlock.images.map((image, index) => (
                    <>
                      <Image image={image} key={index} />
                    </>
                  ))}
                </Masonry>
              </ResponsiveMasonry>
            </>
          ) : null}
        </>
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
        <Projects
          projectList={pageBlock.ressources}
          heading={pageBlock.heading}
          displayStyle={"list"}
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
            <div className="blockitem">
              <div className="textblock">
                <BlockContent
                  blocks={pageBlock.content}
                  heading={pageBlock.heading}
                />
              </div>
            </div>
          )}
        </>
      )}
      {pageBlock._type === "row" && (
        <div
          className="flex-row align-center fold blockitem "
          style={{ width: "100%" }}
        >
          {pageBlock.rowContent.map((rowBlock, index) => (
            <div key={index} className="block">
              {rowBlock.customImage && (
                <Image
                  image={rowBlock.customImage}
                  imageDescription={
                    rowBlock.customImage.imageDescription &&
                    rowBlock.customImage.imageDescription
                  }
                />
              )}
            </div>
          ))}
        </div>
      )}{" "}
      {pageBlock._type === "customImage" && (
        <div
          className="flex-row align-center blockitem"
          style={{ width: "100%" }}
        >
          <Image
            image={pageBlock.customImage}
            imageDescription={
              pageBlock.customImage.imageDescription &&
              pageBlock.customImage.imageDescription
            }
          />
        </div>
      )}
      {pageBlock._type === "video" && <Video videoContent={pageBlock} />}
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
        <div key={index} className="block">
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
