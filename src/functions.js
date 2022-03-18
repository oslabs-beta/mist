import axios from 'axios';
import Chart from 'chart.js/auto';
import {
  workerTimer,
  mockLogArray,
  labels,
  succs,
  errs,
  subReqs,
  pieData,
  theme,
  labelsCache,
  testSuccs,
  testErrs,
  testSubReqs,
  pieDataCache,
} from './store';

const grid = '#F6F6F6';

///////////// logs COMMENTED OUT FOR TESTING
export const createData = (logs) => {
  /// mock Logs for testing
  // const logs = [
  //   {
  //     _id: 1,
  //     method: 'POST',
  //     url: 'http://localhost:8080/penguins',
  //     status: 200,
  //     response_time_ms: 1.74,
  //     session_num: 1,
  //     start: 950,
  //   },
  //   {
  //     _id: 2,
  //     method: 'GET',
  //     url: 'http://localhost:8080/',
  //     status: 400,
  //     response_time_ms: 2.56,
  //     session_num: 1,
  //     start: 725,
  //   },
  //   {
  //     _id: 3,
  //     method: 'POST',
  //     url: 'http://localhost:8080/realData',
  //     status: 200,
  //     response_time_ms: 2.71,
  //     session_num: 1,
  //     start: 455,
  //   },
  //   {
  //     _id: 4,
  //     method: 'GET',
  //     url: 'http://localhost:8080/',
  //     status: 200,
  //     response_time_ms: 3.56,
  //     session_num: 2,
  //     start: 950,
  //   },
  // ];
  // RESET CHARTING DATA
  if (labels.length > 1) {
    labels.length = 0;
    labels.push(0);
    succs.length = 0;
    errs.length = 0;
    subReqs.length = 0;
    pieData.length = 0;
    pieData.push(0);
    pieData.push(0);
    pieData.push(0);
  }
  // GENERATE NEW CHARTING DATA
  const duration = workerTimer.stop - workerTimer.start;
  for (let i = 0; i < duration; i += 50) {
    labels.push(i);
    if (i + 50 >= duration) {
      labels.push(i + 50);
    }
  }

  for (let i = 0; i < logs.length; i++) {
    if (logs[i].status < 300 && logs[i].status !== 204) {
      pieData[0] += 1;
      succs.push({
        x: logs[i].start - workerTimer.start,
        y: logs[i].response_time_ms,
      });
    }
    // Cloudflare's highest error status is 530
    if (logs[i].status > 299 && logs[i].status <= 530) {
      pieData[1] += 1;
      errs.push({
        x: logs[i].start - workerTimer.start,
        y: logs[i].response_time_ms,
      });
    }
    if (logs[i].status === 204) {
      pieData[2] += 1;
      subReqs.push({
        x: logs[i].start - workerTimer.start,
        y: logs[i].response_time_ms,
      });
    }
  }

  console.log(`labels ${labels}`);
  // console.log(`req times ${requestTimes}`);
  // console.log(`successes ${succs}`);
  // console.log(`errors ${errs}`);
};
export const createLineGraph = () => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Successes',
        backgroundColor: '#6194BC', //darker blue
        borderColor: '#6194BC',
        data: succs,
        showLine: false,
        pointRadius: 5,
      },

      {
        label: 'Errors',
        backgroundColor: '#FF9E01', //orange
        borderColor: '#FF9E01',
        data: errs,
        showLine: false,
        pointRadius: 5,
      },

      {
        label: 'Sub-Requests',
        backgroundColor: '#D0EAFF', //lighter blue
        borderColor: '#D0EAFF',
        data: subReqs,
        showLine: false,
        pointRadius: 5,
      },
    ],
  };

  const config = {
    type: 'scatter',
    data: data,
    options: {
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              return `start time: ${context.parsed.x}ms | duration: ${context.parsed.y}ms`;
            },
          },
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          min: 0,
          title: {
            display: true,
            align: 'center',
            text: 'Time in Milliseconds',
          },
          grid: {
            color: grid /*'rgb(18, 16, 16)'*/,
          },
        },
        y: {
          min: 0,
          title: {
            display: true,
            align: 'center',
            text: 'Duration of Requests in Milliseconds',
          },
          grid: {
            color: grid /*'rgb(18, 16, 16)'*/,
          },
        },
      },
    },
  };

  const myChart = new Chart(
    document.getElementById('myChart').getContext('2d'),
    config
  );
  console.log(testSuccs);
  console.log(testErrs);
};
export const createPieChart = () => {
  const pieLabels = ['Success', 'Errors', 'Sub-Requests'];
  const data = {
    labels: pieLabels,
    datasets: [
      {
        label: 'Worker Activity',
        backgroundColor: ['#6194BC', '#FF9E01', '#D0EAFF'],
        data: pieData,
        hoverOffset: 4,
      },
    ],
  };

  const config = {
    type: 'doughnut',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: true,
      legend: {
        display: true,
        labels: {
          fontSize: 30,
        },
      },
    },
  };

  const doughnutChart = new Chart(
    document.getElementById('doughnutChart'),
    config
  );
};

export const createBarChart = () => {
  const barLabels = ['Day 1', 'Day 2', 'Day 3'];

  const data = {
    labels: barLabels,
    datasets: [
      {
        label: 'Worker 1',
        backgroundColor: ['#6194BC'], //pink
        data: [10, 20, 30],
        borderWidth: 1,
      },
      {
        label: 'Worker 2',
        backgroundColor: ['#FF9E01'], //orange
        data: [3, 6, 9],
        borderWidth: 1,
      },
      {
        label: 'Worker 3',
        backgroundColor: ['#D0EAFF'], //purple
        data: [7, 2, 49],
        borderWidth: 1,
      },
    ],
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        x: {
          min: 0,
          title: {
            diplay: true,
            color: grid,
            text: 'Session',
            align: 'center',
          },
          beginAtZero: true,
          stacked: true,
          grid: {
            display: true,
            color: grid,
          },
          color: grid,
        },
        y: {
          min: 0,
          title: {
            diplay: true,
            color: grid,
            text: '# of Requests per Worker',
            align: 'center',
          },
          beginAtZero: true,
          stacked: true,
          grid: {
            display: true,
            color: grid,
          },
          color: grid,
        },
      },
    },
  };

  const stackedBar = new Chart(document.getElementById('barChart'), config);
};
