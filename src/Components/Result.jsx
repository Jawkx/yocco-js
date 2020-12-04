import React from "react";

const Result = (props) => {
  const faceDirectionX = props.faceDirectionX;
  const suspiciousObjs = props.suspiciousObjs;
  const personCount = props.personCount;

  return (
    <div className="result">
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
};

export default Result;
