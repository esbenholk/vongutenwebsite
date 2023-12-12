import React, { useContext } from "react";
import BlockContent from "./blocks/BlockContent";
import AppContext from "../globalState";
import Image from "./blocks/image";
import MenuItem from "./blocks/menuItem";

export default function Footer({ color, logo }) {
  const myContext = useContext(AppContext);
  const info = myContext.siteSettings;

  console.log("footer", info);

  return (
    <>
      <div
        className=""
        style={{
          zIndex: 0,
          backgroundColor: color,
          position: "relative",
        }}
      >
        <div
          style={{
            zIndex: 0,
            position: "absolute",
            bottom: "100%",
            minHeight: "500px",
            width: "100%",
            backgroundImage: `linear-gradient( to top, ${color} 10%, rgba(246,246,246,0) )`,
            pointerEvents: "none",
          }}
        ></div>
        <footer>
          <Image image={logo} />

          <div className="flex-row align-right fold">
            {info.breadContent != null ? (
              <>
                {info.breadContent.content &&
                info.breadContent.content.length > 0 ? (
                  <BlockContent
                    blocks={info.breadContent.content}
                    heading={info.breadContent.heading}
                  />
                ) : null}
              </>
            ) : null}
            <div className="flex-row centerOnMobile">
              {info.footerMenu != null && info.footerMenu.columns.length > 0 ? (
                <>
                  {info.footerMenu.columns.map((column, index) => (
                    <div className="flex-column linkColumn" key={index}>
                      {column.links.external_links.map((link, index) => (
                        <MenuItem
                          menuItem={link}
                          imageInline={false}
                          imagesize={30}
                          key={index}
                        />
                      ))}
                    </div>
                  ))}
                </>
              ) : null}
              {info.footerMenuSocials != null &&
              info.footerMenuSocials.length > 0 ? (
                <div className="flex-column socialLinks">
                  {info.footerMenuSocials.map((link, index) => (
                    <MenuItem
                      menuItem={link}
                      imageInline={true}
                      key={index}
                      imagesize={30}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
