import Chart from 'chart.js/auto';
//import { CLOSE_REASON_NORMAL } from 'websocket/lib/WebSocketConnection'; -> (no idea what this is or where it came from, but it breaks the app)
import {
  workerTimer,
  mockLogArray,
  labels,
  succs,
  errs,
  subReqs,
  pieData,
  currentWorker,
  sessAvgs,
  sessNums,
} from './store';

// (couldn't figure out how to process scss in svelte/rollup)
const grid = '#F6F6F6';

///////////// logs/avgLogs COMMENTED OUT FOR TESTING -> (uncomment when live) ////////////
export const createData = (logs, avgLogs) => {
  /*
  /// dummy logs -> for testing purposes -> (coment out when live)
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
  //// dummy avgLogs -> for testing purposes -> (coment out when live)
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
*/
  // RESETS CHARTING DATA
  if (labels.length > 1) {
    labels.length = 0;
    labels.push(0);
    succs.length = 0;
    errs.length = 0;
    subReqs.length = 0;
    pieData.length = 0;
    pieData.push(0);
    pieData.push(0);

    sessAvgs.length = 0;
    sessNums.length = 0;
    currentWorker.length = 0;
  }
  // GENERATES NEW CHARTING DATA
  currentWorker.push(logs[0].worker);
  const duration = workerTimer.stop - workerTimer.start;
  console.log(`duration: ${duration}`);
  for (let i = 1000; i < duration; i += 1000) {
    labels.push(i);
    if (i + 1000 >= duration) {
      labels.push(i + 1000);
    }
  }

  for (let i = 0; i < logs.length; i++) {
    console.log(`log${i}: ${logs[i].start - workerTimer.start}`);
    // generates success data for charts
    if (logs[i].status < 300) {
      pieData[0] += 1;
      succs.push({
        x: logs[i].start - workerTimer.start,
        y: logs[i].response_time_ms,
      });
    }
    // Cloudflare's highest error status is 530
    else {
      pieData[1] += 1;
      errs.push({
        x: logs[i].start - workerTimer.start,
        y: logs[i].response_time_ms,
      });
    }
  }

  console.log(`labels ${labels}`);

  let curSess = 0;
  // const sessNums = []; // DELETE -> (imported from store)
  const sessions = [[], [], [], [], []];
  // const sessAvgs = []; // DELETE -> (imported from store)
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
export const createScatterChart = () => {
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

      // {
      //   label: 'Sub-Requests',
      //   backgroundColor: '#D0EAFF', //lighter blue
      //   borderColor: '#D0EAFF',
      //   data: subReqs,
      //   showLine: false,
      //   pointRadius: 5,
      // },
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
            text: 'Time in ms',
          },
          grid: {
            color: grid,
          },
        },
        y: {
          min: 0,
          title: {
            display: true,
            align: 'center',
            text: 'Duration of Requests in ms',
          },
          grid: {
            color: grid,
          },
        },
      },
    },
  };

  const scatterChart = new Chart(
    document.getElementById('scatterChart').getContext('2d'),
    config
  );
};

// attaches Pie Chart to PieChart.svelte
export const createPieChart = () => {
  const pieLabels = ['Success', 'Errors'];
  const data = {
    labels: pieLabels,
    datasets: [
      {
        label: 'Worker Activity',
        backgroundColor: ['#6194BC', '#FF9E01'],
        data: pieData,
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

// attaches Bar Graph to BarChart.svelte
export const createBarGraph = () => {
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
        label: 'Past Sessions Average Response Time',
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
  const config = {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      events: [],
      scales: {
        x: {
          display: true,
          title: {
            diplay: true,
            text: `Previous Sessions for Worker ${currentWorker[0]}`,
          },
          min: 0,
          grid: {
            display: true,
            color: grid,
          },
          color: grid,
        },
        y: {
          display: true,
          beginAtZero: true,
          ticks: {
            callback: function (value, index, ticks) {
              return value + 'ms';
            },
          },
          title: {
            diplay: true,
            text: 'Avg Response Time in Milliseconds',
          },
          grid: {
            display: true,
            color: grid,
          },
          color: grid,
        },
      },
      plugins: {
        legend: {
          labels: {
            boxWidth: 0,
          },
        },
      },
    },
  };
  const barGraph = new Chart(document.getElementById('barGraph'), config);
};
