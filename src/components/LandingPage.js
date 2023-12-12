import React, { useContext, useState, useEffect } from "react";

import Projects from "./blocks/ProjectSorting";
import PageBuilder from "./pageBuilder";
import AppContext from "../globalState";
import Image from "./blocks/image";
import BlockContent from "./blocks/BlockContent";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

export default function LandingPage({
  updateVisitedLinks,
  visitedLinks,
  updateSiteColor,
}) {
  const myContext = useContext(AppContext);
  const info = myContext.siteSettings;
  const [isImage1, setIsImage1] = useState(true);
  const { slug } = useParams();
  useEffect(() => {
    updateSiteColor(info.color);
  }, [slug]);

  console.log("LANDING PAGE", info, myContext.projectList);

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
            <Image image={isImage1 ? info.logo : info.logo2} />
          </div>
          <div className="greeting logo">
            <BlockContent blocks={isImage1 ? info.greeting : info.greeting2} />
          </div>
        </div>
      </div>
      {info.pageBuilder && <PageBuilder pageBuilder={info.pageBuilder} />}
      <div className="flex-column">
        <Projects
          updateVisitedLinks={updateVisitedLinks}
          visitedLinks={visitedLinks}
          projectList={myContext.projectList}
          displayCategoryButton={false}
          displayTagButton={true}
          displayStyle="list"
        />
      </div>
    </>
  );
}
