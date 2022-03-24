import axios from 'axios';
import Chart from 'chart.js/auto';
import { CLOSE_REASON_NORMAL } from 'websocket/lib/WebSocketConnection';
import {
  workerTimer,
  mockLogArray,
  labels,
  succs,
  errs,
  subReqs,
  pieData,
  // theme,
  // labelsCache,
  // testSuccs,
  // testErrs,
  // testSubReqs,
  // pieDataCache,
  currentWorker,
  sessAvgs,
  sessNums,
} from './store';

const grid = '#F6F6F6';

///////////// logs COMMENTED OUT FOR TESTING
export const createData = (/*logs, avgLogs*/) => {
  /// mock Logs for testing
  const logs = [
    {
      _id: 193,
      method: 'GET',
      url: '/',
      status: 200,
      response_time_ms: 4.3,
      session_num: 30,
      start: '1647906546879',
      worker: 'sample-worker-2',
    },
    {
      _id: 194,
      method: 'GET',
      url: '/favicon.ico',
      status: 200,
      response_time_ms: 2.36,
      session_num: 30,
      start: '1647906547045',
      worker: 'sample-worker-2',
    },
    {
      _id: 195,
      method: 'GET',
      url: '/',
      status: 200,
      response_time_ms: 1.47,
      session_num: 30,
      start: '1647906547104',
      worker: 'sample-worker-2',
    },
    {
      _id: 196,
      method: 'GET',
      url: '/favicon.ico',
      status: 200,
      response_time_ms: 1.53,
      session_num: 30,
      start: '1647906547178',
      worker: 'sample-worker-2',
    },
    {
      _id: 197,
      method: 'GET',
      url: '/',
      status: 200,
      response_time_ms: 1.74,
      session_num: 30,
      start: '1647906547533',
      worker: 'sample-worker-2',
    },
    {
      _id: 198,
      method: 'GET',
      url: '/favicon.ico',
      status: 200,
      response_time_ms: 1.23,
      session_num: 30,
      start: '1647906547572',
      worker: 'sample-worker-2',
    },
    {
      _id: 199,
      method: 'GET',
      url: '/',
      status: 200,
      response_time_ms: 1.72,
      session_num: 30,
      start: '1647906548039',
      worker: 'sample-worker-2',
    },
    {
      _id: 200,
      method: 'GET',
      url: '/favicon.ico',
      status: 200,
      response_time_ms: 1.63,
      session_num: 30,
      start: '1647906548087',
      worker: 'sample-worker-2',
    },
  ];
  //// mock avgLogs
  const avgLogs = [
    { response_time_ms: 4.18, session_num: 26 },
    { response_time_ms: 0.68, session_num: 26 },
    { response_time_ms: 1.26, session_num: 26 },
    { response_time_ms: 1.4, session_num: 26 },
    { response_time_ms: 2.49, session_num: 26 },
    { response_time_ms: 0.81, session_num: 26 },
    { response_time_ms: 14.69, session_num: 27 },
    { response_time_ms: 0.83, session_num: 27 },
    { response_time_ms: 1.22, session_num: 27 },
    { response_time_ms: 1.4, session_num: 27 },
    { response_time_ms: 2.76, session_num: 27 },
    { response_time_ms: 1.63, session_num: 27 },
    { response_time_ms: 1.57, session_num: 27 },
    { response_time_ms: 0.75, session_num: 27 },
    { response_time_ms: 10.85, session_num: 28 },
    { response_time_ms: 1.14, session_num: 28 },
    { response_time_ms: 1.34, session_num: 28 },
    { response_time_ms: 2.54, session_num: 28 },
    { response_time_ms: 1.46, session_num: 28 },
    { response_time_ms: 2.52, session_num: 28 },
    { response_time_ms: 9.21, session_num: 29 },
    { response_time_ms: 0.79, session_num: 29 },
    { response_time_ms: 1.62, session_num: 29 },
    { response_time_ms: 1.13, session_num: 29 },
    { response_time_ms: 1.62, session_num: 29 },
    { response_time_ms: 1.11, session_num: 29 },
    { response_time_ms: 1.03, session_num: 29 },
    { response_time_ms: 0.69, session_num: 29 },
    { response_time_ms: 1.5, session_num: 29 },
    { response_time_ms: 1.18, session_num: 29 },
    { response_time_ms: 4.3, session_num: 30 },
    { response_time_ms: 2.36, session_num: 30 },
    { response_time_ms: 1.47, session_num: 30 },
    { response_time_ms: 1.53, session_num: 30 },
    { response_time_ms: 1.74, session_num: 30 },
    { response_time_ms: 1.23, session_num: 30 },
    { response_time_ms: 1.72, session_num: 30 },
    { response_time_ms: 1.63, session_num: 30 },
  ];

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
    sessAvgs.length = 0;
    sessNums.length = 0;
    currentWorker.length = 0;
  }
  // GENERATE NEW CHARTING DATA
  currentWorker.push(logs[0].worker);
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

  let curSess = 0;
  // const sessNums = [];
  const sessions = [[], [], [], [], []];
  // const sessAvgs = [];
  for (let i = 0; i < avgLogs.length; i++) {
    if (i === 0) sessNums.push(avgLogs[i].session_num);
    if (avgLogs[i].session_num !== sessNums[curSess]) {
      ++curSess;
      sessNums.push(avgLogs[i].session_num);
    }
    sessions[curSess].push(avgLogs[i].response_time_ms);
  }
  console.log(sessions);
  sessions.forEach((session) => {
    let total = 0;
    for (let i = 0; i < session.length; i++) {
      total += session[i];
    }
    sessAvgs.push(total / session.length);
  });
  console.log(`Session number: ${sessNums}`);
  console.log(`Session Averages: ${sessAvgs}`);
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
  // console.log(testSuccs);
  // console.log(testErrs);
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
        backgroundColor: ['#6194BC'],
        data: [10, 20, 30],
        borderWidth: 1,
      },
      {
        label: 'Worker 2',
        backgroundColor: ['#FF9E01'],
        data: [3, 6, 9],
        borderWidth: 1,
      },
      {
        label: 'Worker 3',
        backgroundColor: ['#D0EAFF'],
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

export const createWorkerChart = () => {
  const data = {
    labels: [
      `Session ${sessNums[0]}`,
      `Session ${sessNums[1]}`,
      `Session ${sessNums[2]}`,
      `Session ${sessNums[3]}`,
      `Session ${sessNums[4]}`,
    ],
    datasets: [
      {
        /*'Sessions',*/
        label: [
          `${sessNums[0]}`,
          `${sessNums[1]}`,
          `${sessNums[2]}`,
          `${sessNums[3]}`,
          `${sessNums[4]}`,
        ],
        backgroundColor: [
          '#3a5971',
          '#446884',
          '#4e7696',
          '#5785a9',
          '#6194BC',
        ],
        data: sessAvgs,
        borderWidth: 1,
      },
    ],
  };
  // const plugin = {
  //   tooltips: {
  //     enabled: false,
  //   },
  // };
  const config = {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,

      scales: {
        x: {
          title: {
            diplay: true,
            // align: 'center',
            // color: grid,
            text: `Previous Sessions for Worker ${currentWorker[0]}`,
          },

          // beginAtZero: true,
          min: 0,
          color: grid,
        },
        y: {
          title: {
            diplay: true,
            // align: 'center',
            // color: grid,
            text: 'Avg Response Time in Milliseconds',
          },

          // beginAtZero: true,
          min: 0,
          color: grid,
        },
      },
      plugins: {
        title: {
          display: true,
          text: 'Sessions',
          // font: {
          //   weight: 'normal',
          // },
        },
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
      },

      // plugins: {
      //   legend: {
      //     labels: {
      //       // This more specific font property overrides the global property
      //       font: {
      //         size: 20,
      //       },
      //     },
      //   },
      // },
    },
  };
  const workerChart = new Chart(document.getElementById('barChart'), config);
};
