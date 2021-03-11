import { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { openImage } from "./ModeratorFunction";

export const LogChartPhone = (props) => {

  const studentLog = props.studentLog;

  const data = {
    labels: props.chartLabel,
    datasets: [
      {
        label: 'Suspicious Level',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: props.chartData
      }
    ]
  };

  const options = {
    scales: {
      yAxes: [{
        gridLines: {
          color: "rgba(0,0,0,0)",
        },
        ticks: {
          max: 1,
          min: 0,
        }
      }],
      xAxes: [{
        gridLines: {
          color: "rgba(0,0,0,0)"
        },
        // display: false
      }]
    },
    tooltips: {
      mode: "single",
      callbacks: {
        label: function(tooltipItem) {
          let index = tooltipItem.index;
          let susRating = studentLog[index].susRating.toString();
          let susObj = studentLog[index].SuspiciousObject.toString();
          let susSpeech = (studentLog[index].suspiciousSpeech.length / 5).toString();
          var displayString = [
            "Suspicious Rating : " + susRating, 
            "Suspicious Object : " + susObj,
            "Suspicious Speech : " + susSpeech 
          ];
          return  displayString
        }
      }
    },
    onClick: (e,element) => {
      if (element.length > 0) {
        let index = element[0]._index;
        let data = studentLog[index].Image;
        openImage(data);
      }
    },
    maintainAspectRatio: false
  }


  return(
    <div>
      <Line data={data} options={options} height={300} />
    </div>
  );
} 


export const LogChart = (props) => {

  const studentLog = props.studentLog;

  const data = {
    labels: props.chartLabel,
    datasets: [
      {
        label: 'Suspicious Level',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: props.chartData
      }
    ]
  };

  const options = {
    scales: {
      yAxes: [{
        gridLines: {
          color: "rgba(0,0,0,0)",
        },
        ticks: {
          max: 1,
          min: 0,
        }
      }],
      xAxes: [{
        gridLines: {
          color: "rgba(0,0,0,0)"
        },
        // display: false
      }]
    },
    tooltips: {
      mode: "single",
      callbacks: {
        label: function(tooltipItem) {
          let index = tooltipItem.index;
          let log = studentLog[index]
          let susRating = log.susRating.toString();
          let noPerson = log.noPerson.toString();
          let lookingAround = log.lookingAround.toString();
          let multiplePerson = log.multiplePerson.toString();
          let susObj = log.haveSuspiciousObject.toString();
          let susSpeech = (studentLog[index].suspiciousSpeech.length / 5).toString();
          var displayString = [
            "Suspicious Rating : " + susRating, 
            "Suspicious Object : " + susObj,
            "Suspicious Speech : " + susSpeech,
            "No Person : " + noPerson,
            "Looking Around : " + lookingAround,
            "Multiple Person : " + multiplePerson 
          ];
          return  displayString
        }
      }
    },
    onClick: (e,element) => {
      if (element.length > 0) {
        let index = element[0]._index;
        let data = studentLog[index].Image;
        openImage(data);
      }
    },
    maintainAspectRatio: false
  }


  return(
    <div>
      <Line data={data} options={options} height={300} />
    </div>
  );
} 
