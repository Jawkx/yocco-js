import { useRef, useEffect } from "react";

const drawObjs = (objects, ctx) => {
  // Loop through each object
  objects.forEach((object) => {
    // Extract boxes and classes
    const [x, y, width, height] = object["bbox"];
    const text = object["class"];
    // Set styling
    ctx.strokeStyle = "#FF0000";
    ctx.font = "18px Arial";

    // Draw rectangles and text
    ctx.fillStyle = "#FF0000";
    ctx.fillText(text, x, y);
    ctx.rect(x, y, width, height);
    ctx.stroke();
  });
};

const drawFaces = (faces, scaleFactor, ctx) => {
  faces.forEach((face) => {
    const start = face.topLeft;
    const end = face.bottomRight;
    const size = [
      end[0] / scaleFactor[0] - start[0] / scaleFactor[0],
      end[1] / scaleFactor[1] - start[1] / scaleFactor[1],
    ];

    ctx.strokeStyle = "#FF0000";
    ctx.font = "18px Arial";
    // face.landmarks.forEach((landmark) => {
    //   ctx.fillRect(landmark[0], landmark[1], 5, 5);
    // });
    // Draw rectangles and text
    ctx.fillStyle = "#FF0000";
    ctx.rect(
      start[0] / scaleFactor[0],
      start[1] / scaleFactor[1],
      size[0] / scaleFactor[0],
      size[1] / scaleFactor[1]
    );
    ctx.stroke();
  });
};

const getLookingDirection = (faces) => {
  if (faces.length !== 0) {
    if (faces.length > 1) {
      return "more than one face present";
    }

    const face = faces[0];
    const start = face.topLeft;
    const end = face.bottomRight;
    const size = [end[0] - start[0], end[1] - start[1]];
    const center = [start[0] + size[0] / 2, start[1] + size[1] / 2];
    const [noseX, noseY] = face["landmarks"][2];

    const turnPercentX = ((noseX - center[0]) / size[0]) * 100;
    const turnPercentY = ((noseY - center[1]) / size[1]) * 100;

    //console.log(turnPercentX, turnPercentY);

    var facingDirection = "Facing";

    if (Math.abs(turnPercentX) < 30) {
      facingDirection = facingDirection.concat(" Foward");
    } else {
      if (turnPercentX < 0) {
        facingDirection = facingDirection.concat(" Right");
      } else if (turnPercentX > 0) {
        facingDirection = facingDirection.concat(" Left");
      }
    }

    if (turnPercentY > 10) {
      facingDirection = facingDirection.concat(" Down");
    }

    if (turnPercentY < -10) {
      facingDirection = facingDirection.concat(" Up");
    }

    return facingDirection;
  }
};

const returnSuspiciousObjects = (objs) => {
  const suspiciousObjDict = [];
  const suspiciousObjs = objs.filter((obj) =>
    suspiciousObjDict.includes(obj.class)
  );

  return suspiciousObjs;
};

const getPersonCount = (objs) => {
  const personCount = objs.filter((obj) => obj.class === "person").length;

  return personCount;
};

export const detect = async (
  cocoNet,
  blazeNet,
  setStartFaceScanning,
  setFaceDirectionX,
  setObjects,
  setPersonCount,
  setFaces,
  setScaleFactor,
  startedFaceScanning,
  webcamRef
) => {
  if (
    typeof webcamRef.current !== "undefined" &&
    webcamRef.current !== null &&
    webcamRef.current.video.readyState === 4
  ) {
    // Get Video Properties
    const video = webcamRef.current.video;

    const scaledVideoWidth = 480;
    const scaledVideoHeight = 360;

    if (startedFaceScanning === false) {
      const captureWidth = video.videoWidth;
      const captureHeight = video.videoHeight;

      const xScaleFactor = captureWidth / scaledVideoWidth;
      const yScaleFactor = captureHeight / scaledVideoHeight;

      setScaleFactor([xScaleFactor, yScaleFactor]);
    }

    // Scale video
    webcamRef.current.video.width = scaledVideoWidth;
    webcamRef.current.video.height = scaledVideoHeight;

    // Make Detections
    const objs = await cocoNet.detect(video);
    const faces = await blazeNet.estimateFaces(video, false);

    // Updating hooks
    setStartFaceScanning(true);
    setFaceDirectionX(getLookingDirection(faces));
    setObjects(returnSuspiciousObjects(objs));
    setPersonCount(getPersonCount(objs));
    setFaces(faces);
  }
};

export const useCanvas = (obj, faces, scaleFactor) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    canvasRef.current.width = 480;
    canvasRef.current.height = 360;
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, 480, 360);
    drawFaces(faces, scaleFactor, ctx);
    drawObjs(obj, scaleFactor, ctx);
  });

  return canvasRef;
};
