import firebase from "../../firebase";
var db = firebase.firestore();
var storage = firebase.storage();

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
    offenses = [...offenses, "noPerson"];
  } else if (faceDirection.match(/right|left|up/gim)) {
    offenses = [...offenses, "lookingAround"];
  }

  return offenses;
};

export const generateLog = async (
  offenses,
  trackCount,
  suspiciousSpeech,
  captureImage,
  uid
) => {
  const offensesNumber = offenses.length;
  const timeString = new Date().toLocaleTimeString();
  let log = {};
  log["multiplePerson"] = log["noPerson"] = log["lookingAround"] = log[
    "haveSuspiciousObject"
  ] = 0;
  for (let i = 0; i < offensesNumber; i++) {
    let offense = offenses[i];
    if (offense !== "null") {
      log[offense] = log[offense] ? log[offense] + 1 : 1;
    }
  }

  for (let [key, value] of Object.entries(log)) {
    log[key] = value / trackCount;
  }

  let speechLength = suspiciousSpeech.length;
  let speechPercentage = speechLength >= 5 ? 1 : speechLength / 5;
  let susRating =
    (log["multiplePerson"] +
      log["noPerson"] +
      log["lookingAround"] +
      log["haveSuspiciousObject"] +
      speechPercentage) /
    3;
  log["suspiciousSpeech"] = suspiciousSpeech.toString();
  log["Time"] = timeString;
  log["susRating"] = susRating;

  let image = captureImage();
  let imageName = uid + timeString;
  await storage.ref(imageName).putString(image, "data_url");
  const url = await storage.ref().child(imageName).getDownloadURL();
  (async () => {
    console.log("Logged !" + url);
    log["Image"] = url;
  })();

  return log;
};

export const sendResult = (examID, uid, log) => {
  const docRef = db.collection("examsLog").doc(examID);
  docRef.update({
    [uid]: firebase.firestore.FieldValue.arrayUnion(log),
  });
};
