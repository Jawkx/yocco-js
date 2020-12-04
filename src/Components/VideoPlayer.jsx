import React from "react";
import Webcam from "react-webcam";

const VideoPlayer = (props) => {
  const webcamRef = props.webcamRef;
  const canvasRef = props.canvasRef;

  return (
    <section className="videoPlayer">
      <Webcam ref={webcamRef} muted={true} className="webcam" />

      <canvas ref={canvasRef} className="canvas" />
    </section>
  );
};

export default VideoPlayer;
