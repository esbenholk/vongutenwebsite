import React, { useContext } from "react";
import { motion } from "framer-motion";
import BlockContent from "./blocks/BlockContent";
import Hero from "./blocks/hero";
import Video from "./blocks/videoPlayer";
import ConnectedProjects from "./connectedProject";

export default function PageBuilder({ pageBuilder }) {
  console.log(pageBuilder);

  return (
    <motion.div>
      {pageBuilder.map((page, index) => (
        <div key={index}>
          {page._type == "hero" && (
            <Hero
              image={page.image}
              heading={page.heading}
              tagLine={page.tagline}
            />
          )}
          {page._type == "connectedProjects" && (
            <ConnectedProjects
              projects={page.projects}
              heading={page.heading}
            />
          )}
          {page._type == "breadContent" && (
            <>{page.content && <BlockContent blocks={page.content} />}</>
          )}
          {page._type == "video" && (
            <>
              <Video videoContent={page} />
            </>
          )}
        </div>
      ))}
    </motion.div>
  );
}
