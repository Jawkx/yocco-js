import firebase from "../../firebase";
var db = firebase.firestore();

export const getStudentLog = (examID , studentID, setStudentLog) => {
  const docRef = db.collection("examsLog").doc(examID);
  docRef.get().then((doc) => {
    if (doc.exists) {
      const data = doc.data()[studentID];
      setStudentLog(data)
    } 
  })
}

export const getStudentLogPhone = (examID , studentID, setStudentLogPhone) => {
  const docRef = db.collection("examsLog").doc(examID);
  docRef.get().then((doc) => {
    if (doc.exists) {
      const data = doc.data()[studentID];
      setStudentLogPhone(data)
    } 
  })
}

export const getStudent = (examID, setStudent) => {
  const docRef = db.collection("examsInfo").doc(examID);
  docRef.get().then((doc) => {
    if (doc.exists) {
      const students = doc.data().participants
      setStudent(students)
    }
  })
}

export const getExam = (setExam) => {
  const docRef = db.collection("examsInfo");
  docRef.onSnapshot((queryss) => {
    let exam = [];
    queryss.forEach((doc) => {
      exam.push(doc.id);
    })
    setExam(exam)
  })
}