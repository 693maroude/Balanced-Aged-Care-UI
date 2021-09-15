import React, { useEffect, useRef } from "react";
import trimCanvas from "trim-canvas";
import StyledCanvas from "../styles/StyledCanvas";
import { Button } from "../styles/Button";

const TextCanvas = ({
  setShowModal,
  setSignature,
  setInputValue,
  canvasText,
  setCanvasText,
}) => {
  const canvasRef = useRef(null);
  const emptyCanvasRef = useRef(null);
  const canvasHeight = "120";
  const canvasWidth = "540";
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "3.875rem Mr De Haviland";
    context.textAlign = "center";
    context.fillText(canvasText, canvas.width / 2, canvas.height * 0.7);
    canvas.style.width = canvas.width;
  }, [canvasText]);

  return (
    <>
      <StyledCanvas
        height={canvasHeight}
        width={canvasWidth}
        ref={emptyCanvasRef}
        style={{ display: "none" }}
      />
      <StyledCanvas height={canvasHeight} width={canvasWidth} ref={canvasRef} />
      <Button
        onClick={() => {
          if (
            canvasRef.current.toDataURL() === emptyCanvasRef.current.toDataURL()
          ) {
            setSignature(false);
          } else {
            setSignature(trimCanvas(canvasRef.current).toDataURL("image/png"));
          }
          setInputValue("");
          setCanvasText("");
          setShowModal((prev) => !prev);
        }}
      >
        Insert
      </Button>
    </>
  );
};

export default TextCanvas;
