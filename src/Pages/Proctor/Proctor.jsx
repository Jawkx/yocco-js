// Import React stuff
import React from "react";
import { useEffect, useRef, useState } from "react";
// Import speech recognition result
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

// Import Tensorflow JS and Models (cocossd and blazaface)
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import * as blazeface from "@tensorflow-models/blazeface";

// Import custom functions
import { useCanvas, detect } from "./videoDetectionFunctions";
import { processSpeech } from "./soundDetectionFunction";
import { generateLog, getOffenses, sendResult } from "./generalFunctions";

// Import custom Hooks
import { useInterval } from "./useInterval";
// Import subcomponents
import VideoPlayer from "./VideoPlayer";
import Result from "./Result";
// Import Styles module
import styles from "./proctorStyle.module.css";

const suspiciousDict = [
  "question",
  "array",
  "voltage",
  "torque",
  "current",
  "copy",
  "can",
  "i",
  "answer",
  "value",
];

const suspiciousObjDict = ["books , cell phone"];

const Proctor = ({ uid, examID }) => {
  // Video Detection Hooks
  const [objects, setObjects] = useState([]);
  const [faces, setFaces] = useState([]);
  const [faceDirection, setFaceDirection] = useState("");
  const [personCount, setPersonCount] = useState(0);
  const [startedFaceScanning, setStartedFaceScanning] = useState(false);
  const [scaleFactor, setScaleFactor] = useState([1, 1]);
  const [trackCount, setTrackCount] = useState(0);
  const [offenses, setOffenses] = useState([]);

  // Speech Detection Hooks
  const { transcript, resetTranscript } = useSpeechRecognition();

  // Creating reference to HTML object
  const webcamRef = useRef(null);
  const canvasRef = useCanvas(objects, faces, scaleFactor);

  const startVideoDetection = async () => {
    const cocoNet = await cocossd.load();
    const blazefaceNet = await blazeface.load();
    setInterval(() => {
      detect(
        cocoNet,
        blazefaceNet,
        setStartedFaceScanning,
        setFaceDirection,
        setObjects,
        setPersonCount,
        setFaces,
        setScaleFactor,
        startedFaceScanning,
        suspiciousObjDict,
        webcamRef
      );
    }, 10);
  };

  const suspiciousSpeech = processSpeech(transcript, suspiciousDict);

  const handleSendResult = () => {
    const log = generateLog(offenses, trackCount, suspiciousSpeech);
    setOffenses([]);
    setTrackCount(0);
    resetTranscript();
    sendResult(examID, uid, suspiciousSpeech, logs);
  };

  useInterval(() => {
    handleSendResult();
  }, 10000);

  useEffect(() => {
    startVideoDetection();
    SpeechRecognition.startListening({ continuous: true });
  }, []);

  useEffect(() => {
    const offenses = getOffenses(faceDirection, personCount, objects);
    setOffenses((prevOffenses) => [...prevOffenses, ...offenses]);
    setTrackCount((prevTrackCount) => (prevTrackCount += 1));
  }, [faceDirection, personCount, objects]);

  return (
    <section className={styles.section}>
      <VideoPlayer webcamRef={webcamRef} canvasRef={canvasRef} />
      <Result
        faceDirection={faceDirection}
        suspiciousObjs={objects}
        personCount={personCount}
        startedFaceScanning={startedFaceScanning}
        filteredResult={suspiciousSpeech}
      />
    </section>
  );
};

export default Proctor;
