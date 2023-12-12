import React, { useState, useEffect, useContext } from "react";

import Masonry from "react-masonry-css";

import PostCard from "./postCard.js";

import AppContext from "../../globalState.js";

import DB_Item from "./db_item.js";

const breakpointColumnsObj = {
  default: 3,
  1300: 2,
  600: 2,
};

export default function Projects({
  projectList,
  displayCategoryButton,
  displayTagButton,
  updateVisitedLinks,
  visitedLinks,
  displayStyle,
}) {
  const myContext = useContext(AppContext);
  const info = myContext.siteSettings;
  const [allPosts, setAllPosts] = useState(projectList);

  const [sortedPosts, setSortedPosts] = useState(null);

  const [tags, setTags] = useState(myContext.tags);
  const [currentTags, setCurrentTags] = useState([]);

  const [categories, setCategories] = useState(myContext.categories);
  const [currentCategories, setCurrentCategories] = useState([]);

  useEffect(() => {
    console.log("project list", projectList);
    setAllPosts(projectList);
    setSortedPosts(projectList);
    var tags = [];
    var tagNames = [];
    var categories = [];
    var categoryNames = [];

    for (let index = 0; index < projectList.length; index++) {
      const post = projectList[index];
      post.value = 0;

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
  }, [projectList]);

  useEffect(() => {
    if (currentTags.length > 0 || currentCategories.length > 0) {
      const tempSortedPosts = [];
      console.log(
        "search criteria has been updated",
        currentCategories,
        currentTags
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
        if (post_score > 0) {
          post.value = post_score;
          tempSortedPosts.push(post);
        }
      }
      tempSortedPosts.sort((a, b) => b.value - a.value);

      setSortedPosts(tempSortedPosts);
    } else {
      setSortedPosts(allPosts);
    }
  }, [currentTags, allPosts, currentCategories]);

  function setTag(tag) {
    if (!currentTags.includes(tag.tag)) {
      const tempTags = [...currentTags];
      tempTags.push(tag.tag);
      setCurrentTags(tempTags);
      document.getElementById("tag_" + tag.tag).classList.add("active");
      console.log(
        "should make tag active",
        document.getElementById("tag_" + tag.tag)
      );
    } else if (currentTags.includes(tag.tag)) {
      var tagIndex = currentTags.indexOf(tag.tag);
      currentTags.splice(tagIndex, 1);
      const tempTags = [...currentTags];
      document.getElementById("tag_" + tag.tag).classList.remove("active");
      setCurrentTags(tempTags);
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
      {displayCategoryButton && (
        <div className="flex-row">
          {categories &&
            categories.map((category, index) => (
              <button
                className="tag_button standardButton "
                key={index}
                id={"category_" + category.title + ""}
                onClick={(evt) => {
                  setCategory({ category });
                }}
              >
                {category.title}
              </button>
            ))}
        </div>
      )}

      {displayTagButton && (
        <div className="flex-row">
          {tags.map((tag, index) => (
            <button
              className="tag_button standardButton"
              key={index}
              id={"tag_" + tag + ""}
              onClick={() => {
                setTag({ tag });
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {displayStyle === "list" && (
        <div className="list">
          {sortedPosts
            ? sortedPosts.map((project, index) => (
                <DB_Item
                  key={index}
                  url={project.slug.current}
                  title={project.title}
                  year={project.time ? project.time : project.date}
                  description={project.description}
                  updateVisitedLinks={updateVisitedLinks}
                  visitedLinks={visitedLinks}
                />
              ))
            : null}
          {info.comingProjects
            ? info.comingProjects.map((project, index) => (
                <DB_Item
                  key={index}
                  url={project.link}
                  title={project.title}
                  year={project.year}
                  description={project.description}
                  updateVisitedLinks={updateVisitedLinks}
                  visitedLinks={visitedLinks}
                />
              ))
            : null}
        </div>
      )}

      {displayStyle === "masonry" && sortedPosts ? (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid fullWidthPadded"
          columnClassName="my-masonry-grid_column"
        >
          {sortedPosts &&
            sortedPosts.map((post, index) => (
              <PostCard post={post} key={index} />
            ))}
        </Masonry>
      ) : null}
    </div>
  );
}
