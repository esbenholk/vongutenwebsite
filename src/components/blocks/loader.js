import React from "react";
import styled from "styled-components";

const PermissionButton = styled.div`
  width: 144.5px;
  height: 139px;
  background: url(../assets/jungle/tapme.png) no-repeat 0 0 / 100% auto;
  position: absolute;
  left: calc(50vw - 72.25px);
  top: calc(50vh - 69.5px);
  cursor: pointer;
`;
function Loader({ color1, color2 }) {
  return (
    <>
      {/* <div className="cell">
        <div className="circle gelatine"></div>
      </div> */}
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
