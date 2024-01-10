import React, { useState, useEffect } from "react";
import sanityClient from "../client";
import { useParams } from "react-router-dom";
import { HeadTags } from "./blocks/helmetHeaderTags";
// import Loader from "./blocks/loader";
import PageBuilder from "./pageBuilder";
import { pageBuilderquerystring } from "../queeries";
import Loader from "./blocks/loader";

export default function SinglePage({
  visitedLinks,
  updateVisitedLinks,
  updateSiteColor,
  updateSiteSound,
  updateShouldToggleMode,
}) {
  const { slug } = useParams();
  const [singlePage, setSinglePage] = useState();

  ///get project data, set category names
  useEffect(() => {
    updateShouldToggleMode(false);
    sanityClient
      .fetch(
        `*[_type == "page" && slug.current == "${slug}"]{ title, color, slug, mainImage, tags, categories[]->{title, slug},${pageBuilderquerystring}} `
      )
      .then((data) => {
        setSinglePage(data[0]);
        if (data[0].color) {
          updateSiteColor(data[0].color);

          if (data[0].audio) {
            updateSiteSound(data[0].audio.asset.url);
          }
        }
      })
      .catch(console.error);
  }, [slug, updateShouldToggleMode, updateSiteColor, updateSiteSound]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!singlePage) return <Loader />;

  return (
    <>
      {singlePage && (
        <>
          <HeadTags
            title={singlePage.title}
            //   description={singlePost.recap[0].children[0].text}
            // image={singlePage.mainImage.asset.url}
          />
          <div className="projectPage page">
            {singlePage.pageBuilder && (
              <PageBuilder
                pageBuilder={singlePage.pageBuilder}
                visitedLinks={visitedLinks}
                updateVisitedLinks={updateVisitedLinks}
              />
            )}
          </div>
        </>
      )}
    </>
  );
}
