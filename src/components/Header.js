import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import AppContext from "../globalState";

export default function Header({ color, shouldToggleMode }) {
  const myContext = useContext(AppContext);
  const info = myContext.siteSettings;

  return (
    <div
      className="flex-row menu header"
      style={{
        zIndex: 0,
        backgroundImage: `linear-gradient( to bottom, ${color} 20%, rgba(246,246,246,0) )`,
      }}
    >
      {info.headerMenu && (
        <>
          <NavLink key={"/"} to={"/"} className={"menu_link"} exact="true">
            About
          </NavLink>
          {info.headerMenu.map((menuItem, index) => (
            <div
              key={index}
              style={{
                zIndex: 1,
              }}
            >
              {menuItem.url ? (
                <NavLink
                  key={menuItem.url}
                  to={menuItem.url}
                  className={"menu_link"}
                >
                  {menuItem.title}
                </NavLink>
              ) : menuItem.project ? (
                <NavLink
                  key={menuItem.project.slug.current}
                  to={"/" + menuItem.project.slug.current}
                  className={"menu_link"}
                >
                  {menuItem.title}
                </NavLink>
              ) : menuItem.page ? (
                <NavLink
                  key={menuItem.page.slug.current}
                  to={"/" + menuItem.page.slug.current}
                  className={"menu_link"}
                >
                  {menuItem.title}
                </NavLink>
              ) : menuItem.category ? (
                <NavLink
                  key={menuItem.category.slug.current}
                  to={"/" + menuItem.category.slug.current}
                  className={"menu_link"}
                  activeClassName="current"
                >
                  {menuItem.title}
                </NavLink>
              ) : null}
            </div>
          ))}
          {shouldToggleMode && <div key={"mode"} className={"menu_link"}></div>}
        </>
      )}
    </div>
  );
}
