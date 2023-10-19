import React, { useContext, lazy } from "react";

import { NavLink } from "react-router-dom";
import AppContext from "../globalState";
import { useParams } from "react-router-dom";
import useWindowDimensions from "./functions/useWindowDimensions";

const SinglePost = lazy(() => import("./singlePost.js"));
const Category = lazy(() => import("./Category.js"));
const SinglePage = lazy(() => import("./page"));

export default function SlugContext({ CategoryNames, PageNames }) {
  const { slug } = useParams();
  console.log(CategoryNames, PageNames);

  return (
    <>
      {PageNames.find((name) => name.title.toLowerCase() == slug) ? (
        <SinglePage />
      ) : (
        <>
          {CategoryNames.find((name) => name.toLowerCase() == slug) ? (
            <Category />
          ) : (
            <SinglePost />
          )}
        </>
      )}
    </>
  );
}
