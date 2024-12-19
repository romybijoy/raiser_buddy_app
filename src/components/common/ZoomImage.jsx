import React, { useRef } from "react";
import {
  TransformWrapper,
  TransformComponent,
  useTransformComponent,
} from "react-zoom-pan-pinch";
import "../../styles/product-details.css";
import ZoomInIcon from "@mui/icons-material/ZoomIn"; 
import ZoomOutIcon from "@mui/icons-material/ZoomOut"; 
import CloseIcon from "@mui/icons-material/Close";

const Controls = ({ zoomIn, zoomOut, resetTransform }) => (
  <div className="btn-group-vertical mx-3">
    <button
      className="btn btn-light small-button"
      onClick={() => zoomIn()}
    >
      <ZoomInIcon fontSize="small" />
    </button>
    <button
      className="btn btn-light small-button"
      onClick={() => zoomOut()}
    >
     <ZoomOutIcon fontSize="small" />
    </button>
    <button
      className="btn btn-light small-button"
      onClick={() => resetTransform()}
    >
      <CloseIcon fontSize="small" />
    </button>
  </div>
);

const ZoomImage = ({image}) => {
  // const { zoomToElement } = useTransformComponent();

  // const zoomToImage = () => {
  //   zoomToElement("imgExample");
  // };

  return (
    <TransformWrapper
      initialScale={1}
      initialPositionX={0}
      initialPositionY={0}
    >
      {({ zoomIn, zoomOut, resetTransform }) => (
        <div style={{ display: 'flex' }}>
          <Controls
            zoomIn={zoomIn}
            zoomOut={zoomOut}
            resetTransform={resetTransform}
          />
          <TransformComponent>
            <img
              src={image}
              alt="Zoomable"
              id="imgExample"
              style={{ width: 1000, height: 300 }}
            />
            
          </TransformComponent>
        </div>
      )}
    </TransformWrapper>
  );
};

export default ZoomImage;
