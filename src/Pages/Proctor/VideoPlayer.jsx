import React from "react";
import Webcam from "react-webcam";
import styles from "./proctorStyle.module.css";

const VideoPlayer = (props) => {
  const webcamRef = props.webcamRef;
  const canvasRef = props.canvasRef;

  const displayFeed = (
    <div>
      <Webcam ref={webcamRef} muted={true} className={styles.video} />

      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );

  return (
    <section className="videoPlayer">
      {webcamRef != null ? displayFeed : <h1>Opening Webcam</h1>}
    </section>
  );
};

export default VideoPlayer;
