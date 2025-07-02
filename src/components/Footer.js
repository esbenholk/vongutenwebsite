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

  return (
    <>
      <div
        className=""
        style={{
          zIndex: 0,
          backgroundColor: "black",
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
            backgroundImage: `linear-gradient( to top, black 0%, ${color} 30%, rgba(246,246,246,0) 100% )`,
            pointerEvents: "none",
          }}
        ></div>
        <footer>
          <div className="flex-row fold space-between">
            <div className="logo">
              <Image image={logo} />
            </div>
            <div className="flex-row fold">
              <button
                onClick={function () {
                  setMuted(!muted);
                }}
                className="modeButton soundButton"
              >
                {muted ? (
                  <img
                    src={
                      localNightMode
                        ? process.env.PUBLIC_URL + "assets/SoundOn.svg"
                        : process.env.PUBLIC_URL + "assets/SoundOn.svg"
                    }
                    alt={"unmute"}
                  />
                ) : (
                  <img
                    src={
                      localNightMode
                        ? process.env.PUBLIC_URL + "assets/SoundOff.svg"
                        : process.env.PUBLIC_URL + "assets/SoundOff.svg"
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
                    src={process.env.PUBLIC_URL + "assets/Light.svg"}
                    alt={"lightMode"}
                  />
                ) : (
                  <img
                    src={process.env.PUBLIC_URL + "assets/Dark.svg"}
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
