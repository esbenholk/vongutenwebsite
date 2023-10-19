import React, { useEffect, useState, useRef, Suspense } from "react";
import styled from "styled-components";
import useWindowDimensions from "./functions/useWindowDimensions";
import * as THREE from "three";

import {
  Color,
  CubeTextureLoader,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
} from "three";

import {
  FirstPersonControls,
  DeviceOrientationControls,
  Points,
  Point,
  useTexture,
} from "@react-three/drei";

import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { useLoader, Canvas, useThree, useFrame } from "@react-three/fiber";

const objUrl = "../assets/jungle/jungle.obj";

const particleUrl = "../assets/jungle/particleTexture.png";

const skyBoxTextureUrls = [
  "../assets/jungle/cubemaps/posx.jpg",
  "../assets/jungle/cubemaps/negx.jpg ",
  "../assets/jungle/cubemaps/posy.jpg",
  "../assets/jungle/cubemaps/negy.jpg",
  "../assets/jungle/cubemaps/posz.jpg",
  "../assets/jungle/cubemaps/negz.jpg",
];

const denseCapColors = [
  "#E817FF",
  "#D89500",
  "#2ECDC1",
  "#A3A2A2",
  "#FFEC00",
  "#0DFF2F",
  "#C90090",
  "#FF0000",
  "#FFD7D7",
  "#8E8E8E",
  "#85FFD0",
  "#8CB3ED",
  "#FFFF00",
  "#7F28BC",
  "#FF6600",
  "#FF83C4",
  "#0000FF",
  "#F4F4F4",
  "#11E000",
];

const PermissionButton = styled.div`
  width: 144.5px;
  height: 139px;
  background: url(../assets/jungle/tapme.png) no-repeat 0 0 / 100% auto;
  position: absolute;
  left: calc(50vw - 72.25px);
  top: calc(50vh - 69.5px);
  cursor: pointer;
`;

function Jungle() {
  const { height } = useWindowDimensions();
  const [object, setJungleObj] = useState(useLoader(OBJLoader, objUrl));
  var [frameMeshes, setFrameMeshes] = useState();

  const [orientationRequestPermission, setOrientationRequestPermission] =
    useState(false);
  const [orientationPermissionGranted, setOrientationPermissionGranted] =
    useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.DeviceOrientationEvent && "ontouchstart" in window);
    setOrientationRequestPermission(
      window.DeviceOrientationEvent &&
        typeof window.DeviceOrientationEvent.requestPermission === "function"
    );
  }, []);

  useEffect(() => {
    object.scale.set(-1, 1, 1);
    let tempArray = [];
    object.traverse(function (child) {
      if (child instanceof Mesh) {
        if (child.name.includes("Cube") || child.name.includes("FRAME")) {
          const mat = new MeshBasicMaterial({
            color: 0xff0000,
            wireframe: false,
          });
          mat.color = new Color(
            denseCapColors[Math.floor(Math.random() * denseCapColors.length)]
          );
          child.material = mat;
        } else {
          child.material = new MeshBasicMaterial({
            color: 0x000000,
            wireframe: false,
            side: DoubleSide,
          });
        }
        tempArray.push(child);
        setFrameMeshes(tempArray);
      }
    });
    setJungleObj(object);
  }, [object]);

  return (
    <>
      {orientationRequestPermission && !orientationPermissionGranted && (
        <PermissionButton
          onTouchEnd={() => {
            // if (mobileControls.current) mobileControls.current.connect();
            setOrientationPermissionGranted(true);
          }}
        />
      )}
      <Canvas
        id="canvas"
        style={{
          width: "100%",
          position: "relative",
          height: height,
          background: "black",
        }}
        linear
        camera={{ position: [0, 0, 25], near: 0.1, far: 10000000 }}
      >
        {isMobile ? (
          <DeviceOrientationControls />
        ) : (
          <FirstPersonControls activeLook={true} lookSpeed={0.05} />
        )}

        <Suspense fallback={null}>
          <Scene />
          <group scale={[-1, 1, 1]}>
            {frameMeshes &&
              frameMeshes.map((mesh, index) => (
                <primitive
                  object={mesh}
                  key={index}
                  onPointerOver={(e) => {
                    if (e.eventObject && e.eventObject.material) {
                      console.log(e.eventObject);
                      if (
                        (e.eventObject.name != null &&
                          e.eventObject.name.includes("Cube")) ||
                        (e.eventObject.name != null &&
                          e.eventObject.name.includes("FRAME"))
                      ) {
                        e.eventObject.material.color.set(
                          denseCapColors[
                            Math.floor(Math.random() * denseCapColors.length)
                          ]
                        );
                      }
                    }
                  }}
                />
              ))}
          </group>
        </Suspense>
      </Canvas>
    </>
  );
}

function SkyBox() {
  const { scene } = useThree();

  useEffect(() => {
    const loader = new CubeTextureLoader();
    const mat = loader.load(skyBoxTextureUrls);
    scene.background = mat;
    scene.environment = mat;
  }, [scene]);

  return null;
}

class Scene extends React.Component {
  render() {
    return (
      <>
        <SkyBox />
        <ambientLight />
        <Particles />
      </>
    );
  }
}

function Particles() {
  const count = 100;
  const size = 2;
  const positionFactor = 144;
  const rotationSpeed = 0.1;

  const particleTexture = useTexture(particleUrl);

  const particlesRef = useRef();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    particlesRef.current.rotation.y = elapsedTime * rotationSpeed;
    particlesRef.current.rotation.z = (elapsedTime * rotationSpeed) / 2;
  });

  return (
    <Points ref={particlesRef} limit={10000}>
      <pointsMaterial
        size={size}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        vertexColors
        map={particleTexture}
        alphaMap={particleTexture}
      />
      {Array.from({ length: count }).map((_, i) => (
        <Point
          key={i}
          position={[
            (0.5 - Math.random()) * positionFactor,
            (0.5 - Math.random()) * positionFactor,
            (0.5 - Math.random()) * positionFactor,
          ]}
          color={"white"}
        />
      ))}
    </Points>
  );
}
export default Jungle;
