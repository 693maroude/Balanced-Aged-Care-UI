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
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "3rem Mr De Haviland";
    context.textAlign = "center";
    context.fillText(canvasText, canvas.width / 2, 75);
  }, [canvasText]);

  return (
    <>
      <canvas
        ref={emptyCanvasRef}
        id="blank"
        width="490"
        height="100"
        style={{ display: "none" }}
      />
      <StyledCanvas ref={canvasRef} width="490" height="100" />
      <Button
        onClick={() => {
          if (
            canvasRef.current.toDataURL() === emptyCanvasRef.current.toDataURL()
          ) {
            setSignature("none");
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
