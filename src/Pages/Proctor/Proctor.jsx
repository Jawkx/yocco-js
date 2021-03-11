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

import { PageHeader } from "antd";
// Import custom functions
import { useCanvas, detect } from "./videoDetectionFunctions";
import { processSpeech } from "./soundDetectionFunction";
import {
  generateLog,
  getOffenses,
  sendResult,
  getSusDict,
} from "./generalFunctions";

// Import custom Hooks
import { useInterval } from "./useInterval";
// Import subcomponents
import VideoPlayer from "./VideoPlayer";
import Result from "./Result";
// Import Styles module
import styles from "./proctorStyle.module.css";

const suspiciousObjDict = ["books", "cell phone"];

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
  const [suspiciousDict, setSuspiciousDict] = useState([]);

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
        suspiciousObjDict,
        webcamRef
      );
    }, 20);
  };

  const suspiciousSpeech = processSpeech(transcript, suspiciousDict);

  const captureImage = () => {
    return webcamRef.current.getScreenshot();
  }

  const handleSendResult = () => {
    generateLog(offenses, trackCount, suspiciousSpeech, captureImage, uid)
    .then((log) => {
      // console.log(log);
      sendResult(examID, uid, log);
      setOffenses([]);
      setTrackCount(0);
      resetTranscript();
    })
  };

  useInterval(() => {
    handleSendResult();
  }, 10000);

  useEffect(() => {
    getSusDict(examID, setSuspiciousDict);
    startVideoDetection();
    SpeechRecognition.startListening({ continuous: true });
  }, [examID]);

  useEffect(() => {
    const offenses = getOffenses(faceDirection, personCount, objects);
    setOffenses((prevOffenses) => [...prevOffenses, ...offenses]);
    setTrackCount((prevTrackCount) => (prevTrackCount += 1));
  }, [faceDirection, personCount, objects]);

  return (
    <section>
      <PageHeader title={`Exam ${examID}`} />
      <div className={styles.content}>
        <VideoPlayer
          startedFaceScanning={startedFaceScanning}
          webcamRef={webcamRef}
          canvasRef={canvasRef}
        />
        <Result
          faceDirection={faceDirection}
          suspiciousObjs={objects}
          personCount={personCount}
          filteredResult={suspiciousSpeech}
          startedFaceScanning={startedFaceScanning}
        />
      </div>
    </section>
  );
};

export default Proctor;
