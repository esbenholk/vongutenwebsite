import React, { useState, useEffect, useContext } from "react";

import Masonry from "react-responsive-masonry";

import HeroProjectGrid from "./hero.js";

import AppContext from "../../globalState.js";

import DBItem from "./db_item.js";

import { SquareCard } from "./squareCard.js";

export default function Ressources({
  projectList,
  displayCategoryButton,
  displayTagButton,
  updateVisitedLinks,
  visitedLinks,
  displayStyle,
  displayYearButton,
  highlightedTag,
}) {
  const myContext = useContext(AppContext);
  const [allPosts, setAllPosts] = useState(projectList);

  const [sortedPosts, setSortedPosts] = useState(null);

  const [tags, setTags] = useState(myContext.tags);
  const [currentTags, setCurrentTags] = useState([]);

  const [categories, setCategories] = useState(myContext.categories);
  const [currentCategories, setCurrentCategories] = useState([]);
  const [years, setYears] = useState([]);
  const [currentYears, setCurrentYears] = useState([]);

  console.log("RESSOURCESORTING TAKES ARRAY", projectList);

  useEffect(() => {
    var tags = [];
    var tagNames = [];
    var categories = [];
    var categoryNames = [];
    var years = [];
    var collaborators = [];

    // const tempCategories = [...currentCategories];

    var tempProjectList;

    if (!projectList) {
      setAllPosts(myContext.projectList);
      setSortedPosts(myContext.projectList);
      console.log("finds all projects", myContext);
      tempProjectList = myContext.projectList;
    } else {
      setAllPosts(projectList);
      setSortedPosts(projectList);
      tempProjectList = projectList;
    }

    console.log("project list", tempProjectList);

    for (let index = 0; index < tempProjectList.length; index++) {
      const post = tempProjectList[index];
      post.value = 0;

      years.push(post.year);

      if (post.collaborators != null && Array.isArray(post.collaborators)) {
        for (let index = 0; index < post.collaborators.length; index++) {
          const collaborator = post.collaborators[index];
          if (!collaborators.includes(collaborator.title)) {
            collaborators.push(collaborator.title);
          }
        }
      }

      if (post.tags != null && Array.isArray(post.tags)) {
        for (let index = 0; index < post.tags.length; index++) {
          const tag = post.tags[index];
          if (!tagNames.includes(tag)) {
            tagNames.push(tag);
            tags.push(tag);
          }
        }
      }

      if (post.categories != null && Array.isArray(post.categories)) {
        for (let index = 0; index < post.categories.length; index++) {
          const category = post.categories[index];

          if (!categoryNames.includes(category.title)) {
            categoryNames.push(category.title);
            categories.push(category);
          }
        }
      }
    }

    let sortedTags = [...new Set(tags)];
    setTags(sortedTags);

    let sortedCategories = [...new Set(categories)];
    setCategories(sortedCategories);
    //

    let sortedYears = [...new Set(years)];
    setYears(sortedYears);
  }, [projectList, currentTags, myContext, currentCategories]);

  useEffect(() => {
    if (
      currentTags.length > 0 ||
      currentCategories.length > 0 ||
      currentYears.length > 0
    ) {
      const tempSortedPosts = [];

      console.log(
        "search criteria has been updated",
        currentTags,
        currentCategories,
        currentYears,
        allPosts
      );

      ///loop through all posts
      for (let index = 0; index < allPosts.length; index++) {
        const post = allPosts[index];
        let post_score = 0;

        ///check the posts tags
        if (post.tags) {
          for (let index = 0; index < post.tags.length; index++) {
            const tag = post.tags[index];

            ///compare post tags to currentTags
            if (currentTags.includes(tag)) {
              //set post_score depending on how many currentTags the post is matching
              post_score = post_score + 1;
            }
          }
        }

        if (post.categories) {
          for (let index = 0; index < post.categories.length; index++) {
            const category = post.categories[index];
            // console.log("checks post categories", category);

            ///compare post tags to currentTags
            if (currentCategories.includes(category.title)) {
              //set post_score depending on how many currentTags the post is matching
              post_score = post_score + 2;
              // console.log("post matches a category");
            }
          }
        }

        if (currentYears.includes(post.year.toString())) {
          post_score = post_score + 3;
        }

        if (post_score > 0) {
          post.value = post_score;
          tempSortedPosts.push(post);
        }
      }
      tempSortedPosts.sort((a, b) => b.value - a.value);

      setSortedPosts(tempSortedPosts);
    } else {
      setSortedPosts(allPosts);

      console.log(
        "search is empty",
        currentTags,
        currentCategories,
        currentYears,
        allPosts
      );
    }
  }, [currentTags, allPosts, currentCategories, currentYears]);

  useEffect(() => {
    if (allPosts) {
      for (let index = 0; index < allPosts.length; index++) {
        const post = allPosts[index];
        post.value = 0;
        if (post.tags != null && Array.isArray(post.tags)) {
          const tempTags = [];

          for (let index = 0; index < post.tags.length; index++) {
            const tag = post.tags[index];
            if (highlightedTag === tag) {
              tempTags.push(tag);
              setCurrentTags(tempTags);
              let button = document.getElementById("tag_" + tag);
              if (button) {
                button.classList.add("active");
              }
            }
          }
        }

        if (post.categories != null && Array.isArray(post.categories)) {
          const tempCategories = [];
          for (let index = 0; index < post.categories.length; index++) {
            const category = post.categories[index];

            if (highlightedTag === category.slug.current) {
              tempCategories.push(category.title);
              setCurrentCategories(tempCategories);
              let button = document.getElementById("category_" + category);
              if (button) {
                button.classList.add("active");
              }
            }
          }
        }
      }
    }
  }, [allPosts, highlightedTag]);

  function setTag(_tag) {
    let tag;
    if (_tag.tag) {
      tag = _tag.tag;
    } else {
      tag = _tag;
    }

    if (!currentTags.includes(tag)) {
      console.log("SETS TAG", tag);
      const tempTags = [...currentTags];
      tempTags.push(tag);
      setCurrentTags(tempTags);
      let button = document.getElementById("tag_" + tag);
      if (button) {
        button.classList.add("active");
      }
    } else if (currentTags.includes(tag)) {
      console.log("REMOVES TAG", tag);
      var tagIndex = currentTags.indexOf(tag);
      currentTags.splice(tagIndex, 1);
      const tempTags = [...currentTags];
      setCurrentTags(tempTags);
      let button = document.getElementById("tag_" + tag);
      if (button) {
        button.classList.remove("active");
      }
    }
  }

  function setYear(year) {
    for (let index = 0; index < currentYears.length; index++) {
      const currentYear = currentYears[index];
      let button = document.getElementById("year_" + currentYear.toString());
      if (button) {
        button.classList.remove("active");
      }
    }
    const tempYears = [];
    if (year === "AllTime") {
      setCurrentYears(tempYears);
    } else if (!currentYears.includes(year)) {
      // const tempYears = [...currentYears];
      // the difference between being able to select several years
      const tempYears = [];

      tempYears.push(year);
      setCurrentYears(tempYears);

      let button = document.getElementById("year_" + year.toString());
      if (button) {
        button.classList.add("active");
      }
    } else if (currentYears.includes(year)) {
      var ndex = currentYears.indexOf(year);
      currentYears.splice(ndex, 1);
      // const tempYears = [...currentYears];
      const tempYears = [];
      let button = document.getElementById("year_" + year.toString());
      if (button) {
        button.classList.remove("active");
      }
      setCurrentYears(tempYears);
    }
  }

  function setCategory(category) {
    if (!currentCategories.includes(category.category.title)) {
      const tempCategories = [...currentCategories];
      tempCategories.push(category.category.title);
      setCurrentCategories(tempCategories);
      console.log(
        "should make category active",
        document.getElementById("category_" + category.category.title)
      );
      document
        .getElementById("category_" + category.category.title)
        .classList.add("active");
    } else if (currentCategories.includes(category.category.title)) {
      var categoryIndex = currentCategories.indexOf(category.category.title);
      currentCategories.splice(categoryIndex, 1);
      const tempCategories = [...currentCategories];
      document
        .getElementById("category_" + category.category.title)
        .classList.remove("active");

      setCurrentCategories(tempCategories);
    }
  }

  return (
    <div className="projects">
      <div className="flex-row tagButtons over-flow">
        {displayYearButton && (
          <select
            name="yearSorting"
            id="yearSorting"
            onChange={(evt) => {
              setYear(evt.currentTarget.value);
            }}
          >
            <option
              className="sortingButton"
              id={"year_AllTime"}
              value={"AllTime"}
            >
              {"All Time"}
            </option>
            {years &&
              years.map((year, index) => (
                <option
                  className="sortingButton"
                  key={index}
                  id={"year_" + year.toString()}
                  value={year}
                >
                  {year}
                </option>
              ))}
          </select>
        )}
        {displayCategoryButton &&
          categories &&
          categories.map((category, index) => (
            <button
              className={
                currentCategories.includes(category.title)
                  ? "sortingButton active"
                  : "sortingButton"
              }
              key={index}
              id={"category_" + category.title + ""}
              onClick={(evt) => {
                setCategory({ category });
              }}
            >
              {category.title}
            </button>
          ))}
        {displayTagButton && (
          <>
            {tags.map((tag, index) => (
              <button
                className={
                  currentTags.includes(tag)
                    ? "sortingButton active"
                    : "sortingButton"
                }
                key={index}
                id={"tag_" + tag + ""}
                onClick={() => {
                  setTag(tag);
                }}
              >
                {tag}
              </button>
            ))}
          </>
        )}
      </div>
      {displayStyle === "grid" && (
        <div className="instagramStyle">
          <div>
            {sortedPosts ? (
              <Masonry columnsCount={3}>
                {sortedPosts &&
                  sortedPosts.map((post, index) => (
                    <SquareCard
                      post={post}
                      key={index}
                      class_name={"instagrampic"}
                      width={550}
                    />
                  ))}
              </Masonry>
            ) : null}
          </div>
        </div>
      )}
      {displayStyle === "fullpage" && (
        <div>
          {sortedPosts ? (
            <>
              {sortedPosts &&
                sortedPosts.map((post, index) => (
                  <HeroProjectGrid
                    key={index}
                    image={post.heroImage ? post.heroImage : post.mainImage}
                    // url={post.slug.current}
                    updateVisitedLinks={updateVisitedLinks}
                  />
                ))}
            </>
          ) : null}
        </div>
      )}

      {displayStyle === "list" && (
        <div className="list ressourcelist">
          {sortedPosts
            ? sortedPosts.map((project, index) => (
                <DBItem
                  key={index}
                  url={project.link}
                  title={project.title}
                  // year={project.time ? project.time : project.year}
                  description={project.description}
                  updateVisitedLinks={updateVisitedLinks}
                  visitedLinks={visitedLinks}
                />
              ))
            : null}
        </div>
      )}
    </div>
  );
}
