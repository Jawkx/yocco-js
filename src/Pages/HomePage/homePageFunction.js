import firebase from "../../firebase";
var db = firebase.firestore();

export const getInfo = (uid, setUserInfo, setExamsInfo) => {
  const docRef = db.collection("usersInfo").doc(uid);
  docRef.get().then((doc) => {
    if (doc.exists) {
      const data = doc.data();
      setUserInfo({ name: data.name });
      const exams = data.exams;

      for (let i = 0; i < exams.length; i++) {
        const examID = exams[i];
        const examRef = db.collection("examsInfo").doc(examID);

        examRef.get().then((doc) => {
          if (doc.exists) {
            const examdata = doc.data();

            const examInfo = {
              id: examID,
              name: examdata.title,
              timeStart: examdata.timeStart,
              timeEnd: examdata.timeEnd,
            };

            setExamsInfo((prevInfo) => [...prevInfo, examInfo]);
          }
        });
      }
    } else {
      console.log("No User Found");
    }
  });
};
