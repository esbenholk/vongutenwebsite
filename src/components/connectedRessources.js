import React, { useState, useEffect } from "react";
import sanityClient from "../client";
import Projects from "./blocks/ProjectSorting";

function ConnectedRessources({
  categories,
  type,
  ressources,
  updateVisitedLinks,
  visitedLinks,
}) {
  const [connectedRessources, setConnectedRessources] = useState([]);

  useEffect(() => {
    if (ressources !== null) {
      setConnectedRessources(ressources);
    } else if (categories != null && categories.length > 0) {
      for (let index = 0; index < categories.length; index++) {
        const category = categories[index];
        console.log("category for query", category, index);
        sanityClient
          .fetch(
            `*[_type == "category" && title=="${category.title}"] {title, "ressource": *[_type == "ressource" && references(^._id)]}`
          )
          .then((data) => {
            console.log(data);

            for (let index = 0; index < data.length; index++) {
              const category = data[index];
              if (category.ressource) {
                for (
                  let index = 0;
                  index < category.ressource.length;
                  index++
                ) {
                  const ressource = category.ressource[index];
                  console.log(
                    "HAS Ressource FOR CATEGORY",
                    category.title,
                    ressource
                  );
                  setConnectedRessources((prevArray) => [
                    ...prevArray,
                    ressource,
                  ]);
                }
              }
            }
          })
          .catch(console.error);
      }
    } else {
      sanityClient
        .fetch(
          `*[_type == "ressource"] { title, year, time, mainImage, slug, description, tags, categories[]->{title, slug}}`
        )
        .then((data) => {
          console.log("ALL RESSOURCES", data);

          setConnectedRessources((prevArray) => [...prevArray, data[0]]);
        })
        .catch(console.error);
    }
  }, [categories, ressources]);

  return (
    <>
      <div className="flex-column">
        {" "}
        {connectedRessources && (
          <Projects
            projectList={connectedRessources}
            displayStyle={type}
            updateVisitedLinks={updateVisitedLinks}
            visitedLinks={visitedLinks}
            displayCategoryButton={true}
            displayTagButton={true}
            displayYearButton={true}
          />
        )}
      </div>
    </>
  );
}

export default ConnectedRessources;
