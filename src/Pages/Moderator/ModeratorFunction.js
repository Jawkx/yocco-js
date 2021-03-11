import firebase from "../../firebase";
var db = firebase.firestore();

export const getStudentLogPhone = (examID , studentID, setStudentLogPhone, setChartLabelPhone, setChartDataPhone) => {
  const docRef = db.collection("examsLog").doc(examID);
  docRef.get().then((doc) => {
    if (doc.exists) {
      const data = doc.data()[studentID];
      setStudentLogPhone(data);
      var [chartLabel, chartData] = getChartData(data);
      setChartLabelPhone(chartLabel);
      setChartDataPhone(chartData);
    } 
  })
}

export const getStudentLog = (examID , studentID, setStudentLog, setChartLabel, setChartData) => {
  const docRef = db.collection("examsLog").doc(examID);
  docRef.get().then((doc) => {
    if (doc.exists) {
      const data = doc.data()[studentID];
      setStudentLog(data);
      var [chartLabel, chartData] = getChartData(data);
      setChartLabel(chartLabel);
      setChartData(chartData);
    } 
  })
}

export const getStudent = (examID, setStudentData) => {
  const docRef = db.collection("examsInfo").doc(examID);
  const docRefScore = db.collection("examsLog").doc("TEST1-PHONE");
  docRef.get().then((doc) => {
    if (doc.exists) {
      const students = doc.data().participants;
      docRefScore.get().then((log) => {
        let scoreArr = [];
        students.forEach((id) => {
          let studentLog = [];
          let score = 0;
          if (log.data()[id]) {
            let studentLog = log.data()[id];
          }
          if (studentLog.length != 0) {
            score = studentLog[studentLog.length - 1].susRating;     
          }
          scoreArr.push(score)
        });
        var combined = students.map(function(itm,i){
          return [itm, scoreArr[i]]
        });
        setStudentData(combined)
      });
    }
  });
}



export const getScore = (student, examID, setScore) => {
  const docRef = db.collection("examsLog").doc("TEST1-PHONE");
  docRef.get().then((doc) => {
    if (doc.exists) {
      let scoreArr = [];
      student.forEach((id) => {
        let studentLog = doc.data()[id];
        let score = studentLog[studentLog.length - 1].susRating;
        scoreArr.push(score)
      });
      setScore(scoreArr)
    }
  });
}


export const getExam = (setExam, modName) => {
  const docRefExam = db.collection("examsInfo");
  const docRefMod = db.collection("moderatorsInfo").doc(modName);
  docRefMod.get().then((docMod) => {
    if (docMod.exists) {
      const assignedExams = docMod.data().exams;
      docRefExam.onSnapshot((queryss) => {
        let exam = [];
        queryss.forEach((doc) => {
          if (assignedExams.includes(doc.id)) {
            exam.push(doc.id);
          }
        })
        setExam(exam)
      })
    }
  })
}

export const openImage = (data) => {
  window.open(data, '_blank');
}

export const getChartData = (studentLog) => {
  let chartLabel = [];
  let chartData = [];
  studentLog.forEach((log) => {
    chartLabel.push(log.Time);
    chartData.push(log.susRating);
  });
  return [chartLabel, chartData];
}