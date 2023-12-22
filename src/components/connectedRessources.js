import React, { useState, useEffect } from "react";
import sanityClient from "../client";
import Ressources from "./blocks/RessourceSorting";

function ConnectedRessources({
  categories,
  ressources,
  updateVisitedLinks,
  visitedLinks,
  heading,
  types,
}) {
  const [connectedRessources, setConnectedRessources] = useState([]);

  useEffect(() => {
    setConnectedRessources([]);
    if (ressources) {
      setConnectedRessources(ressources);
    } else if (categories != null && categories.length > 0) {
      for (let index = 0; index < categories.length; index++) {
        const category = categories[index];
        console.log("category for query", category, index);
        sanityClient
          .fetch(
            `*[_type == "category" && title=="${category.title}"] {title, "ressource": *[_type == "ressource" && references(^._id)]{ title, year, time, link, mainImage, slug, description, tags, categories[]->{title, slug}}, slug}`
          )
          .then((data) => {
            data.sort((a, b) => b.year - a.year);

            console.log(
              "has category tag",
              data[0].ressource.length,
              connectedRessources
            );
            if (data && data[0].ressource && data[0].ressource.length > 0) {
              for (let index = 0; index < data[0].ressource.length; index++) {
                const ressource = data[0].ressource[index];

                console.log("has ressource", ressource);
                setConnectedRessources((prevArray) => [
                  ...prevArray,
                  ressource,
                ]);
              }
            }

            // setConnectedRessources((prevArray) => [
            //   ...prevArray,
            //   tempRessources,
            // ]);
          })
          .catch(console.error);
      }
    } else {
      console.log("SHOULD BE GETTING ALL RESSOURCES");
      sanityClient
        .fetch(
          `*[_type == "ressource"] { title, year, link, time, mainImage, slug, description, tags, categories[]->{title, slug}}`
        )
        .then((data) => {
          data.sort((a, b) => b.year - a.year);
          for (let index = 0; index < data.length; index++) {
            const ressource = data[index];
            setConnectedRessources((prevArray) => [...prevArray, ressource]);
          }
        })
        .catch(console.error);
    }
  }, [categories, ressources]);

  useEffect(() => {}, [categories, ressources]);

  return (
    <>
      <div className="flex-column">
        {" "}
        {heading && <h1 className="heading">{heading}</h1>}
        {connectedRessources && connectedRessources.length > 0 && (
          <Ressources
            projectList={connectedRessources}
            displayStyle={"list"}
            updateVisitedLinks={updateVisitedLinks}
            visitedLinks={visitedLinks}
            displayCategoryButton={types.cansortbycategory}
            displayTagButton={types.cansortbytag}
            displayYearButton={types.cansortbyyear}
          />
        )}
      </div>
    </>
  );
}

export default ConnectedRessources;
