/* eslint-disable no-lone-blocks */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Suspense, useEffect, useState, createRef } from "react";
import "./App.css";
import sanityClient from "./client";
import AppContext from "./globalState";
import { AnimatePresence, motion } from "framer-motion";

import { HeadTags } from "./components/blocks/helmetHeaderTags";

import { pageBuilderquerystring } from "./queeries.js";

import SlugContext from "./components/slugContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loader from "./components/blocks/loader";
import LandingPage from "./components/LandingPage.js";

function App() {
  const [siteSettings, setSiteSettings] = useState();
  const [projectList, setProjectList] = useState();
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const mainRef = createRef();
  const [categoryNames, setCategoryNames] = useState([]);
  const [pageNames, setPageNames] = useState([]);
  const [colorCode, setColorCode] = useState("blue");
  const [shouldToggleMode, setShouldToggleMode] = useState(false);
  const [visitedLinks, setVisitedLinks] = useState([]);
  const [isNightMode, setIsNightMode] = useState(false);
  const [sound, setSound] = useState();

  const updateVisitedLinks = (newLink) => {
    setVisitedLinks([...visitedLinks, newLink]);
  };

  const updateSiteColor = (newColor) => {
    setColorCode(newColor);
  };

  const updateShouldToggleMode = (bool) => {
    setShouldToggleMode(bool);
  };

  const setNightMode = (bool) => {
    setIsNightMode(bool);
  };

  const updateSiteSound = (soundUrl) => {
    if (soundUrl !== sound) {
      setSound(soundUrl);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // get sitesettings and page names (for slug redirection)
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "siteSettings" ]{connectedRandoms,comingProjects, color,audio, mainImage{asset->{_id,url}, hotspot},mainImage2{asset->{_id,url}, hotspot}, logo{asset->{_id,url}}, logo2{asset->{_id,url}}, logowhite{asset->{_id,url}}, whitelogo2{asset->{_id,url}}, greeting, greeting2,title,favicon{asset->{_id,url}}, title,  greeting, logo{asset->{_id,url}, hotspot}, breadContent,footerMenuSocials[] {_type == "menuItem" => { _type, image, page->{slug}, project->{slug}, url, title}}, ${pageBuilderquerystring},  headerMenu[] {_type == "menuItem" => { _type, image, page->{slug}, project->{slug}, url, title}}, footerMenu {_type == "linkArrayColumns" => { _type,heading, columns[]{heading, links{external_links[]{title, image, url, page->{slug}, project->{slug}}}}}}}`
      )
      .then((data) => {
        setSiteSettings(data[0]);
        setColorCode(data[0].color);

        console.log("hej internet surfer, wanna be friends 4 real?");
      })
      .catch(console.error);

    sanityClient
      .fetch('*[_type == "page" ]{title, slug}')
      .then((data) => {
        setPageNames(data);
      })
      .catch(console.error);
    sanityClient
      .fetch('*[_type == "category" ]{title, slug}')
      .then((data) => {
        var tempCategoryNames = [];

        if (data) {
          for (let index = 0; index < data.length; index++) {
            const cat = data[index];
            tempCategoryNames.push(cat.slug.current.toLowerCase());
          }
          setCategoryNames(tempCategoryNames);
        }
      })
      .catch(console.error);
  }, []);

  ///get project data, set category names
  useEffect(() => {
    sanityClient
      .fetch(
        ' *[_type == "project"]{ title, year, time, mainImage, heroImage, featuredImage,hoverImage, slug, description, tags, categories[]->{title, slug}}'
      )
      .then((data) => {
        data.sort((a, b) => b.year - a.year);

        setProjectList(data);

        // var categories = [];
        // var tempCategoryNames = [];
        // for (let index = 0; index < data.length; index++) {
        //   const post = data[index];
        //   if (post.categories != null && Array.isArray(post.categories)) {
        //     for (let index = 0; index < post.categories.length; index++) {
        //       const category = post.categories[index];

        //       if (!tempCategoryNames.includes(category.title)) {
        //         tempCategoryNames.push(category.title.toLowerCase());
        //         categories.push(category);
        //       }
        //     }
        //   }
        // }
        // setCategoryNames(tempCategoryNames);
      })
      .catch(console.error);
  }, []);

  ///set global context available
  const globalContext = {
    siteSettings: siteSettings,
    projectList: projectList,
    tags: tags,
    categories: categories,
    mainRef: mainRef,
    colorCode: colorCode,
    isNightMode: isNightMode,
    setSiteSettings,
    setProjectList,
    setTags,
    setCategories,
    setColorCode,
  };

  return (
    <>
      {siteSettings && (
        <>
          <HeadTags
            title={siteSettings.title}
            description={siteSettings.greeting}
            imageUrl={siteSettings.logo.asset.url}
            faviconUrl={siteSettings.favicon.asset.url}
          />
          <Suspense fallback={<Loader color1={colorCode} color2="white" />}>
            <AppContext.Provider value={globalContext}>
              <BrowserRouter>
                <AnimatePresence>
                  <motion.div
                    className={
                      isNightMode ? "mainContainer night" : "mainContainer"
                    }
                    ref={mainRef}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Routes>
                      <Route
                        exact="true"
                        path="/"
                        element={
                          <LandingPage
                            updateVisitedLinks={updateVisitedLinks}
                            visitedLinks={visitedLinks}
                            updateSiteColor={updateSiteColor}
                            updateSiteSound={updateSiteSound}
                            updateShouldToggleMode={updateShouldToggleMode}
                          />
                        }
                      ></Route>
                      {categoryNames && (
                        <Route
                          exact="true"
                          path="/:slug"
                          element={
                            <SlugContext
                              CategoryNames={categoryNames}
                              PageNames={pageNames}
                              updateSiteColor={updateSiteColor}
                              updateSiteSound={updateSiteSound}
                              updateVisitedLinks={updateVisitedLinks}
                              visitedLinks={visitedLinks}
                              updateShouldToggleMode={updateShouldToggleMode}
                            />
                          }
                        ></Route>
                      )}
                    </Routes>
                    <Header
                      color={colorCode}
                      shouldToggleMode={shouldToggleMode}
                    />
                    <Footer
                      setNightMode={setNightMode}
                      color={colorCode}
                      sound={sound}
                      // visitedLinks={visitedLinks}
                      // updateVisitedLinks={updateVisitedLinks}
                      logo={siteSettings.logo}
                    />
                  </motion.div>
                </AnimatePresence>
              </BrowserRouter>
            </AppContext.Provider>
          </Suspense>
        </>
      )}
    </>
  );
}

export default App;
