import logo from "./logo.svg";
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

import VideoPlayer from "./Components/VideoPlayer";
import Result from "./Components/Result";

function App() {
  const [objects, setObjects] = useState([]);
  const [faces, setFaces] = useState([]);
  const [faceDirectionX, setFaceDirectionX] = useState(0);
  const [personCount, setPersonCount] = useState(0);

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
      const videoWidth = 640;
      const videoHeight = 480;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Make Detections
      const objs = await cocoNet.detect(video);
      const faces = await blazeNet.estimateFaces(video, false);
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
        />
        <Transcript />
      </div>
    </div>
  );
}

export default App;
