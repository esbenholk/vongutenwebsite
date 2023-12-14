import React from "react";

function Loader({ color1, color2 }) {
  return (
    <>
      <div
        className={"loaderCover"}
        style={{
          position: "fixed",
          top: "0",
          right: "0",
          width: "100%",
          height: "100%",
          backgroundImage: `repeating-linear-gradient( to bottom, ${color1}, ${color2} )`,

          zIndex: "99999999999999999",
          opacity: "1",
          animation: `fadeOut 5s`,
        }}
      ></div>
    </>
  );
}

export default Loader;
