import React, { useContext } from "react";

import { motion } from "framer-motion";

// import Projects from "./blocks/ProjectSorting";

import AppContext from "../globalState";

// import useWindowDimensions from "./functions/useWindowDimensions";

import PageBuilder from "./pageBuilder";

import Jungle from "./jungle";

export default function LandingPage() {
  const myContext = useContext(AppContext);
  const info = myContext.siteSettings;
  // const projectList = myContext.projectList;

  // console.log("renders page");
  return (
    <motion.div>
      {/* // SETTING SEO TAGS//  */}

      {info.greeting && (
        <motion.h1 className="headline flex-column fullWidthPadded">
          {info.greeting}
        </motion.h1>
      )}
      <Jungle />

      {info.pageBuilder && <PageBuilder pageBuilder={info.pageBuilder} />}

      {/* {projectList ? (
        <div className="regContainer">
          <Projects projectList={projectList} />
        </div>
      ) : null} */}
    </motion.div>
  );
}
