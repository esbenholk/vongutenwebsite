import React, { useContext, useState } from "react";
import BlockContent from "./blocks/BlockContent";
import AppContext from "../globalState";
import Image from "./blocks/image";
import MenuItem from "./blocks/menuItem";
import ReactAudioPlayer from "react-audio-player";

export default function Footer({ color, logo, sound, setNightMode }) {
  const myContext = useContext(AppContext);
  const info = myContext.siteSettings;
  const [muted, setMuted] = useState(false);
  const [localNightMode, setLocalNightMode] = useState(false);

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
        {sound && (
          <ReactAudioPlayer src={sound} muted={muted} autoPlay={true} loop />
        )}

        <div
          style={{
            zIndex: 0,
            position: "absolute",
            bottom: "100%",
            minHeight: "300px",
            width: "100%",
            backgroundImage: `linear-gradient( to top, ${color} 30%, rgba(246,246,246,0) )`,
            pointerEvents: "none",
          }}
        ></div>
        <footer>
          <div className="flex-row space-between">
            <div className="logo">
              <Image image={logo} />
            </div>
            <div>
              <button
                onClick={function () {
                  setMuted(!muted);
                }}
                className="modeButton"
              >
                {muted ? (
                  <img
                    src={
                      localNightMode
                        ? process.env.PUBLIC_URL + "assets/unMuteLight.png"
                        : process.env.PUBLIC_URL + "assets/unMuteDark.png"
                    }
                    alt={"unmute"}
                  />
                ) : (
                  <img
                    src={
                      localNightMode
                        ? process.env.PUBLIC_URL + "assets/muteLight.png"
                        : process.env.PUBLIC_URL + "assets/muteDark.png"
                    }
                    alt={"mute"}
                  />
                )}
              </button>
              <button
                className="modeButton"
                onClick={function () {
                  setNightMode(!localNightMode);
                  setLocalNightMode(!localNightMode);
                }}
              >
                {!localNightMode ? (
                  <img
                    src={process.env.PUBLIC_URL + "assets/lightmode.png"}
                    alt={"lightMode"}
                  />
                ) : (
                  <img
                    src={process.env.PUBLIC_URL + "assets/nightmode.png"}
                    alt={"darkmode"}
                  />
                )}
              </button>
            </div>
          </div>

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
