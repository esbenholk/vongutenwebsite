import React, { lazy } from "react";

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
}) {
  const { slug } = useParams();

  return (
    <>
      {CategoryNames.find((name) => name.toLowerCase() == slug) ? (
        <Category
          CategoryNames={CategoryNames}
          PageNames={PageNames}
          updateSiteColor={updateSiteColor}
          updateVisitedLinks={updateVisitedLinks}
          visitedLinks={visitedLinks}
        />
      ) : PageNames.find((name) => name.slug.current.toLowerCase() == slug) ? (
        <SinglePage
          CategoryNames={CategoryNames}
          PageNames={PageNames}
          updateSiteColor={updateSiteColor}
          updateVisitedLinks={updateVisitedLinks}
          visitedLinks={visitedLinks}
        />
      ) : (
        <SinglePost
          CategoryNames={CategoryNames}
          PageNames={PageNames}
          updateSiteColor={updateSiteColor}
          updateVisitedLinks={updateVisitedLinks}
          visitedLinks={visitedLinks}
        />
      )}
    </>
  );
}
