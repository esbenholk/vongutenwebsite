import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import sanityClient from "../client";
import { useParams, useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import Image from "./blocks/image";
import CustomCarousel from "./blocks/Carousel";
import { Link } from "react-router-dom";

import BlockContent from "./blocks/BlockContent";

import Masonry from "react-masonry-css";
import { HeadTags } from "./blocks/helmetHeaderTags";

import useWindowDimensions from "./functions/useWindowDimensions";

import Loader from "./blocks/loader";
import VideoPlayer from "./blocks/videoPlayer";
import PageBuilder from "./pageBuilder";

export default function SinglePage({}) {
  const history = useHistory();
  const { slug } = useParams();
  const [singlePage, setSinglePage] = useState();
  ///get project data, set category names
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "page" && slug.current == "${slug}"]{ title, slug, mainImage, tags, categories[]->{title, slug}, pageBuilder[]{ _type == "hero" => { _type, heading, tagline, image}, _type == "gallery" => { _type, heading,images}, _type == "breadContent" => { _type, heading, content}, _type == "connectedProjects" => {_type, heading, projects[]->{title, slug}}},} `
      )
      .then((data) => {
        console.log("project details", data, slug);
        setSinglePage(data[0]);
      })
      .catch(console.error);
  }, []);

  if (!singlePage) return <Loader />;
  console.log("PROJECT", singlePage);
  return (
    <>
      {singlePage && (
        <>
          <HeadTags
            title={singlePage.title}
            //   description={singlePost.recap[0].children[0].text}
            // image={singlePage.mainImage.asset.url}
          />
          {singlePage.pageBuilder && (
            <PageBuilder pageBuilder={singlePage.pageBuilder} />
          )}
        </>
      )}
    </>
  );
}
