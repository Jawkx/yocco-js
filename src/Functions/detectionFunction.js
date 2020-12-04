import { useRef, useEffect } from "react";

const suspiciousDict = ["book", "cell phone", "laptop"];

export const drawObjs = (objects, ctx) => {
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

export const drawFaces = (faces, ctx) => {
  faces.forEach((face) => {
    const start = face.topLeft;
    const end = face.bottomRight;
    const size = [end[0] - start[0], end[1] - start[1]];

    ctx.strokeStyle = "#FF0000";
    ctx.font = "18px Arial";
    // face.landmarks.forEach((landmark) => {
    //   ctx.fillRect(landmark[0], landmark[1], 5, 5);
    // });
    // Draw rectangles and text
    ctx.fillStyle = "#FF0000";
    ctx.rect(start[0], start[1], size[0], size[1]);
    ctx.stroke();
  });
};

export const getLookingDirection = (faces) => {
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

    if (Math.abs(turnPercentX) < 20 && Math.abs(turnPercentY) < 20) {
      return "Facing Foward";
    } else {
      if (turnPercentX < 0) {
        return "Facing Right";
      } else if (turnPercentX > 0) {
        return "Facing Left";
      }
    }
  }
};

export const returnSuspiciousObjects = (objs) => {
  const suspiciousObjs = objs.filter((obj) =>
    suspiciousDict.includes(obj.class)
  );

  return suspiciousObjs;
};

export const getPersonCount = (objs) => {
  const personCount = objs.filter((obj) => obj.class === "person").length;

  return personCount;
};

export const useCanvas = (obj, faces) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    canvasRef.current.width = 640;
    canvasRef.current.height = 480;
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, 640, 480);
    //drawFaces(faces, ctx);
    drawObjs(obj, ctx);
  });

  return canvasRef;
};
