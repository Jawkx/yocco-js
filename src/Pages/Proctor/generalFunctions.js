import firebase from "../../firebase";
var db = firebase.firestore();

export const getSusDict = (examid, setSusDict) => {
  const docRef = db.collection("examsInfo").doc(examid);

  docRef.get().then((doc) => {
    if (doc.exists) {
      setSusDict(doc.data().suspiciousText);
    }
  });
};

export const getOffenses = (faceDirection, personCount, objects) => {
  let offenses = [];

  if (objects.length) {
    offenses = [...offenses, "haveSuspiciousObject"];
  }

  if (personCount > 1) {
    offenses = [...offenses, "multiplePerson"];
  } else if (faceDirection === undefined) {
    offenses = [...offenses, "No person"];
  } else if (faceDirection.match(/right|left|up/gim)) {
    offenses = [...offenses, "lookingAround"];
  }

  return offenses;
};

export const generateLog = (offenses, trackCount, suspiciousSpeech) => {
  const offensesNumber = offenses.length;
  const timeString = new Date().toLocaleTimeString();
  let log = {};
  for (let i = 0; i < offensesNumber; i++) {
    let offense = offenses[i];
    if (offense !== "null") {
      log[offense] = log[offense] ? log[offense] + 1 : 1;
    }
  }

  for (let [key, value] of Object.entries(log)) {
    log[key] = value / trackCount;
  }

  log["suspiciousSpeech"] = suspiciousSpeech.toString();
  log["time"] = timeString;

  console.log(log);
  return log;
};

export const sendResult = (examID, uid, log) => {
  const docRef = db.collection("examsLog").doc(examID);
  docRef.update({
    [uid]: firebase.firestore.FieldValue.arrayUnion(log),
  });
};
