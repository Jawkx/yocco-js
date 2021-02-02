import "./App.css";
import { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import * as blazeface from "@tensorflow-models/blazeface";
import {
  useCanvas,
  getLookingDirection,
  returnSuspiciousObjects,
  getPersonCount,
} from "./Functions/detectionFunction";

import VideoPlayer from "./Pages/Proctor/VideoPlayer";
import Result from "./Pages/Proctor/Result";
import Transcript from "./Pages/Proctor/Transcript";

function App() {
  const [objects, setObjects] = useState([]);
  const [faces, setFaces] = useState([]);
  const [faceDirectionX, setFaceDirectionX] = useState(null);
  const [personCount, setPersonCount] = useState(null);

  const [startFaceScanning, setStartFaceScanning] = useState(false);

  const webcamRef = useRef(null);
  const canvasRef = useCanvas(objects, faces);

  const runDetection = async () => {
    const cocoNet = await cocossd.load();
    const blazefaceNet = await blazeface.load();
    setInterval(() => {
      detect(cocoNet, blazefaceNet);
    }, 10);
  };

  const detect = async (cocoNet, blazeNet) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = 480;
      const videoHeight = 360;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Make Detections
      const objs = await cocoNet.detect(video);
      const faces = await blazeNet.estimateFaces(video, false);
      setStartFaceScanning(true);
      setFaceDirectionX(getLookingDirection(faces));
      setObjects(returnSuspiciousObjects(objs));
      setPersonCount(getPersonCount(objs));
      setFaces(faces);
    }
  };

  useEffect(() => {
    runDetection();
  }, []);
  return (
    <div className="App">
      <div className="display-window">
        <VideoPlayer webcamRef={webcamRef} canvasRef={canvasRef} />

        <Result
          faceDirectionX={faceDirectionX}
          suspiciousObjs={objects}
          personCount={personCount}
          startFaceScanning={startFaceScanning}
        />
        <div className="App">
          <Transcript />
        </div>
      </div>
    </div>
  );
}

export default App;
