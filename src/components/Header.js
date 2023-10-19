import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import AppContext from "../globalState";

import Image from "./blocks/image";

import useWindowDimensions from "./functions/useWindowDimensions";

export default function Header() {
  const myContext = useContext(AppContext);
  const info = myContext.siteSettings;
  const { width } = useWindowDimensions();

  return (
    <div className="flex-row menu">
      {info.logo && (
        <NavLink to="/">
          <Image image={info.logo} width={50} />
        </NavLink>
      )}
      {info.headerMenu && (
        <>
          {info.headerMenu.map((menuItem) => (
            <div key={menuItem.url} className="flex-row menu">
              {menuItem.url && (
                <NavLink
                  key={menuItem.url}
                  to={menuItem.url}
                  className={"menu_link"}
                >
                  {menuItem.title}
                </NavLink>
              )}
              {menuItem.project && (
                <NavLink
                  key={menuItem.project.slug.current}
                  to={menuItem.project.slug.current}
                  className={"menu_link"}
                >
                  {menuItem.title}
                </NavLink>
              )}
              {menuItem.page && (
                <NavLink
                  key={menuItem.page.slug.current}
                  to={menuItem.page.slug.current}
                  className={"menu_link"}
                >
                  {menuItem.title}
                </NavLink>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
