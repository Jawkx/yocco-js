import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useInterval } from "./useInterval";
import { getStudent, compare } from "./ModeratorFunction";
import { Button, Card, PageHeader, Divider, Table } from "antd";
import styles from "./moderatorPage.module.css";

const ModeratorPage = ({examID}) => {
  let history = useHistory();
  const [studentData, setStudentData] = useState([]); 
  const test = [
    {
      id: "ecywl1",
      susLevel: "High",
    },
    {
      id: "ecyjc2",
      susLevel: "Moderate",
    },
    {
      id: "efyyl2",
      susLevel: "Low",
    },
    {
      id: "efykj1",
      susLevel: "Low",
    },
  ];
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


  useEffect(() => {
    getStudent(examID, setStudentData);
  }, []);

  useInterval(() => {
    if (studentData) {
      getStudent(examID, setStudentData)
    }
  }, 10000);


  const studentList = (
    <Table 
      columns={columns} 
      dataSource={test} 
      //dataSource={studentData}
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
        subTitle={`Number of attendees: ${test.length}`}
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