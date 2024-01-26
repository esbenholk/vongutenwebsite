import React, { lazy, useEffect } from "react";

import { useParams } from "react-router-dom";

const SinglePost = lazy(() => import("./singlePost.js"));
const Category = lazy(() => import("./Category.js"));
const SinglePage = lazy(() => import("./page"));

export default function SlugContext({
  CategoryNames,
  PageNames,
  updateSiteColor,
  updateVisitedLinks,
  visitedLinks,
  updateShouldToggleMode,
  updateSiteSound,
}) {
  const { slug } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {CategoryNames.find(
        (name) => name.toLowerCase() === slug.toLowerCase()
      ) ? (
        <Category
          CategoryNames={CategoryNames}
          PageNames={PageNames}
          updateSiteColor={updateSiteColor}
          updateSiteSound={updateSiteSound}
          updateVisitedLinks={updateVisitedLinks}
          visitedLinks={visitedLinks}
          updateShouldToggleMode={updateShouldToggleMode}
        />
      ) : PageNames.find(
          (name) => name.slug.current.toLowerCase() === slug.toLowerCase()
        ) ? (
        <>
          <SinglePage
            CategoryNames={CategoryNames}
            PageNames={PageNames}
            updateSiteColor={updateSiteColor}
            updateSiteSound={updateSiteSound}
            updateVisitedLinks={updateVisitedLinks}
            visitedLinks={visitedLinks}
            updateShouldToggleMode={updateShouldToggleMode}
          />
        </>
      ) : (
        <>
          <SinglePost
            updateShouldToggleMode={updateShouldToggleMode}
            CategoryNames={CategoryNames}
            PageNames={PageNames}
            updateSiteColor={updateSiteColor}
            updateVisitedLinks={updateVisitedLinks}
            visitedLinks={visitedLinks}
          />
        </>
      )}
    </>
  );
}
