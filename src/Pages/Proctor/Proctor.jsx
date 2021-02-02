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

// Import custom dunctions
import { useCanvas, detect } from "./videoDetectionFunctions";
import { processSpeech } from "./soundDetectionFunction";
// Import subcomponents
import VideoPlayer from "./VideoPlayer";
import Result from "./Result";

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

const Proctor = () => {
  // Video Detection Hooks
  const [objects, setObjects] = useState([]);
  const [faces, setFaces] = useState([]);
  const [faceDirectionX, setFaceDirectionX] = useState(null);
  const [personCount, setPersonCount] = useState(null);
  const [startedFaceScanning, setStartedFaceScanning] = useState(false);
  const [scaleFactor, setScaleFactor] = useState([1, 1]);

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
        setFaceDirectionX,
        setObjects,
        setPersonCount,
        setFaces,
        setScaleFactor,
        startedFaceScanning,
        webcamRef
      );
    }, 10);
  };

  const [matchedText, resultSize] = processSpeech(transcript, suspiciousDict);

  useEffect(() => {
    startVideoDetection();
    SpeechRecognition.startListening({ continuous: true });
  }, []);

  return (
    <section className="proctor-section">
      <VideoPlayer webcamRef={webcamRef} canvasRef={canvasRef} />
      <Result
        faceDirectionX={faceDirectionX}
        suspiciousObjs={objects}
        personCount={personCount}
        startedFaceScanning={startedFaceScanning}
        filteredResult={matchedText}
      />
    </section>
  );
};

export default Proctor;
