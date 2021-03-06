import firebase from "../../firebase";
var db = firebase.firestore();

export function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const scoreA = a.susScore;
  const scoreB = b.susScore;

  let comparison = 0;
  if (scoreA > scoreB) {
    comparison = -1;
  } else if (scoreA < scoreB) {
    comparison = 1;
  }
  return comparison;
}

export const getName = (uid, setName) => {
  const docRef = db.collection("usersInfo").doc(uid);
  docRef.get().then((doc) => {
    if (doc.exists) {
      const modName = doc.data().name;
      setName(modName);
    }
  })
}

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
        let totalDetails = [];
        students.forEach((id) => {
          let studentLog = [];
          let score = 0;
          if (log.data()[id]) {
            let studentLog = log.data()[id];
          };
          if (studentLog.length != 0) {
            score = studentLog[studentLog.length - 1].susRating;     
          };

          let susLevel = "";
          if (score <= 0.3) {
            susLevel = "Low";
          };
          if (score > 0.3 && score < 0.5) {
            susLevel = "Moderate";
          };
          if (score >= 0.5) {
            susLevel = "High";
          };

          var studentDetails = {
            id : id,
            susLevel : susLevel,
            susScore : score
          };
          totalDetails.push(studentDetails);
        });
        totalDetails.sort(compare)
        setStudentData(totalDetails);
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


export const getExam = (modName, setExamInfo) => {
  const docRefMod = db.collection("usersInfo").doc(modName);
  docRefMod.get().then((docMod) => {
    if (docMod.exists) {
      const assignedExams = docMod.data().exams;
      for (let i = 0; i < assignedExams.length; i++) {
        const examID = assignedExams[i];
        const docRefExam = db.collection("examsInfo").doc(examID);
        docRefExam.get().then((doc) => {
          if (doc.exists) {
            const examdata = doc.data();
            const examInfo = {
              id : examID,
              name: examdata.title,
              timeStart: examdata.timeStart,
              timeEnd: examdata.timeEnd
            };
            setExamInfo((prevInfo) => [...prevInfo, examInfo]);
          }
        })
      }
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