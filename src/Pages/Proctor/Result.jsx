import React from "react";
import styles from "./proctorStyle.module.css";
import { Card, List, Spin, Statistic } from "antd";

const gridStyle = {
  width: "50%",
  textAlign: "center",
  align: "middle",
};

const Result = ({
  faceDirection,
  suspiciousObjs,
  personCount,
  filteredResult,
  startedFaceScanning,
}) => {
  if (!startedFaceScanning) {
    return <Spin />;
  }
  return (
    <Card title="Result" className={styles.result}>
      <Card.Grid style={gridStyle}>
        <Statistic title="Facing direction" value={faceDirection} />
      </Card.Grid>
      <Card.Grid style={gridStyle}>
        <Statistic title="Person Count" value={personCount} />
      </Card.Grid>
      <Card.Grid style={gridStyle}>
        <List
          size="small"
          header={<div> Suspicious Objects </div>}
          bordered
          locale={{ emptyText: "No Suspicious Object" }}
          dataSource={suspiciousObjs}
          renderItem={(obj) => <List.Item> {obj.class}</List.Item>}
        />
      </Card.Grid>
      <Card.Grid style={gridStyle}>
        <List
          size="small"
          header={<div> Suspicious Speech </div>}
          bordered
          locale={{ emptyText: "No Suspicious Speech" }}
          dataSource={filteredResult}
          renderItem={(text) => <List.Item> {text}</List.Item>}
        />
      </Card.Grid>
    </Card>
  );
};

export default Result;
