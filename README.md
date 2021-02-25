# YOCCO JS

## Description

Acronym for You Only Can Cheat Once.
This is a proof-of-concept online protoring webapp that is develop for our Year-3 Meng in Electrical and Electronic group project.

## Features

The web app is currently in development, and it have features as below:

1. Detecting the user's face direction.
2. Detecting suspicious object from the user.
3. Detecting suspicious speech from user.
4. Sending the detection results to a server.
5. Monitoring and compiling "result score" from a client.

## Technologies used

The technologies used in this project are as below

1. [React Js](https://reactjs.org/)
   A Javascript framework for building web interface made by Facebook

2. [Tensorflow Js](https://www.tensorflow.org/js)
   Tensorflow is a machine learning framework design for running machine learning model on javascript website. Few pretrained models are used such as [Object Detection with CocoSSD](https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd) , [Face Detection with BlazeFace](https://github.com/tensorflow/tfjs-models/tree/master/blazeface).

3. [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API)
   An API that was built in into newer version of Google Chrome browser that can enable speech recognition.

4. [Firebase](https://firebase.google.com/)
   Firebase is a backend service provided by google. In this project, a database in firebase called Cloud Firestore was used to store result that was sent from the user's device.
