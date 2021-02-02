import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import filterSpeech from "../../Functions/filterSpeech";

const Transcript = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [matchedText, sizeResult] = filterSpeech(transcript);

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
  };

  const result = (size) => {
    if (size === 0) {
      return <h3> You're Good </h3>;
    } else if (size >= 1 && size <= 3) {
      return <h3> low </h3>;
    } else if (size > 3 && size <= 5) {
      return <h3> medium </h3>;
    } else if (size > 5) {
      return <h3> Warning! Stop Cheating!! </h3>;
    }
    return <h3>Calculating...</h3>;
  };

  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true });
  }, []);

  return (
    <section>
      <h1>Speech Matcher</h1>
      <div classname="container">
        <button
          onClick={() => SpeechRecognition.startListening({ continuous: true })}
        >
          Start
        </button>
        <button onClick={() => handleStopListening()}>Stop</button>
        <button onClick={() => resetTranscript()}>Reset</button>
        <div classname="box">
          <h2> Transcript </h2>
          <p>{transcript}</p>
        </div>
        <div classname="box">
          <h2>Matched Speech</h2>
          {matchedText.join(",")}
        </div>
        <div classname="box">
          <h2>Suspicious level</h2>
          <p>{result(sizeResult)} </p>
        </div>
      </div>
    </section>
  );
};
export default Transcript;
