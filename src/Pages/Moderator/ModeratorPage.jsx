import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useInterval } from "./useInterval";
import { getStudent, compare } from "./ModeratorFunction";
import { Button, Card, PageHeader, Divider, Table } from "antd";
import styles from "./moderatorPage.module.css";

const ModeratorPage = ({examID}) => {
  let history = useHistory();
  const [studentData, setStudentData] = useState([]); 
  const columns = [
    {
      title: "Student ID",
      dataIndex: "id",
      align: "center"
    },
    {
      title: "Suspicious Level",
      dataIndex: "susLevel",
      align: "center",
    }
  ];
  const testData = [
    {
      id: "ecywl1",
      susLevel: "Low",
      susScore: 0
    },
    {
      id: "ecyjc2",
      susLevel: "Moderate",
      susScore: 50
    },
    {
      id: "efyyl2",
      susLevel: "High",
      susScore: 100
    },
    {
      id: "efykj1",
      susLevel: "Low",
      susScore: 0
    }
  ];

  testData.sort(compare);


  useEffect(() => {
    getStudent(examID, setStudentData);
  }, []);

  useInterval(() => {
    if (studentData) {
      getStudent(examID, setStudentData)
    }
  }, 10000);

  console.log(studentData);

  const studentList = (
    <Table 
      columns={columns} 
      dataSource={testData}
      className={styles.table}
      rowClassName={(student, index) => (
        student.susLevel == "Low" ? styles.low :
        student.susLevel == "Moderate" ? styles.moderate :
        styles.high
      )}  
      onRow={(student, index) => {
        return {
          onClick: event => {
            history.push({
              pathname: "/studentLog",
              state: {
                id: student.id,
                examID: examID
              },
            });
          }
        };
      }}
      pagination={false}
    />
  );


  return(
    
    <div>
      <PageHeader
        title={`${examID} Invigilation dashboard`}
        extra={[
          <Link
            to="/"
          >
            <Button type="primary">
              Back to Main Page
            </Button>,
          </Link>
        ]}
      />
      <div className={styles.container}>
        <div className={styles.item}>
          {studentList}
        </div>
      </div>
    </div>
  )
};

export default ModeratorPage;