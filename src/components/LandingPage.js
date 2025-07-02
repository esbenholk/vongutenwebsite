import React, { useContext, useState, useEffect } from "react";

import Projects from "./blocks/ProjectSorting";
import PageBuilder from "./pageBuilder";
import AppContext from "../globalState";
import Image from "./blocks/image";
import BlockContent from "./blocks/BlockContent";
import { useParams } from "react-router-dom";

export default function LandingPage({
  updateVisitedLinks,
  visitedLinks,
  updateSiteColor,
  updateShouldToggleMode,
  updateSiteSound,
}) {
  const myContext = useContext(AppContext);
  const info = myContext.siteSettings;
  const [isImage1, setIsImage1] = useState(true);
  const { slug } = useParams();
  useEffect(() => {
    updateShouldToggleMode(false);

    updateSiteColor(info.color);
    if (info.audio) {
      updateSiteSound(info.audio);
    }
  }, [
    slug,
    info.color,
    updateSiteColor,
    updateShouldToggleMode,
    info.audio,
    updateSiteSound,
  ]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div
        className="flex-row reverse space-around fold introImage regPadding"
        onClick={() => {
          if (isImage1) {
            setIsImage1(false);
          } else {
            setIsImage1(true);
          }
        }}
      >
        <div className="flex-column">
          <Image image={isImage1 ? info.mainImage : info.mainImage2} />{" "}
        </div>
        <div className="flex-column">
          <div className="logo">
            {myContext.isNightMode && info.logowhite != null ? (
              <Image image={isImage1 ? info.logowhite : info.whitelogo2} />
            ) : (
              <Image image={isImage1 ? info.logo : info.logo2} />
            )}
          </div>
          <div className="greeting logo">
            <BlockContent blocks={isImage1 ? info.greeting : info.greeting2} />
          </div>
        </div>
      </div>
      <div className="landingPagePageBuilder">
        {info.pageBuilder && (
          <PageBuilder
            pageBuilder={info.pageBuilder}
            updateVisitedLinks={updateVisitedLinks}
            visitedLinks={visitedLinks}
          />
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
  );
}
