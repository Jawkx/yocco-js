import React from "react";
import styles from "./proctorStyle.module.css";

const Result = ({
  faceDirectionX,
  suspiciousObjs,
  personCount,
  startFaceScanning,
  filteredResult,
}) => {
  const videoDetectionResults = (
    <div className="resultValue">
      <h1> Face Direction : {faceDirectionX} </h1>
      <h1> Suspicious Object: </h1>
      <ul>
        {suspiciousObjs.map((obj) => (
          <li>{obj.class}</li>
        ))}
      </ul>
      <h1>PersonCount : {personCount} </h1>
    </div>
  );

  const speechResult = filteredResult.map((result, idx) => (
    <li key={idx}> {result} </li>
  ));
  return (
    <section className="result">
      {startFaceScanning ? (
        videoDetectionResults
      ) : (
        <h1> Starting Video Detection...</h1>
      )}
      <ul>{speechResult}</ul>
    </section>
  );
};

export default Result;
