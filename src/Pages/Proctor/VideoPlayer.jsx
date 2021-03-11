import { Card, Spin } from "antd";
import React from "react";
import Webcam from "react-webcam";
import styles from "./proctorStyle.module.css";

const VideoPlayer = (props) => {
  const webcamRef = props.webcamRef;
  const canvasRef = props.canvasRef;
  const startedFaceScanning = props.startedFaceScanning;
  const displayFeed = (
    <div style={startedFaceScanning ? {} : { visibility: "hidden" }}>
      <Webcam ref={webcamRef} muted={true} className={styles.video} />
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );

  return <section className={styles.display}>{displayFeed}</section>;
};

export default VideoPlayer;
