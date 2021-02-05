import React from "react";
import styles from "./proctorStyle.module.css";

const Result = ({
  faceDirection,
  suspiciousObjs,
  personCount,
  startedFaceScanning,
  filteredResult,
}) => {
  const videoDetectionResults = (
    <div className="resultValue">
      <h1> Face Direction : {faceDirection} </h1>
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
    <section className={styles.result}>
      {startedFaceScanning ? (
        videoDetectionResults
      ) : (
        <h1> Starting Video Detection...</h1>
      )}
      <ul>{speechResult}</ul>
    </section>
  );
};

export default Result;
