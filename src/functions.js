import Chart from 'chart.js/auto';
import {
  workerTimer,
  labels,
  succs,
  errs,
  subReqs,
  pieData,
  currentWorker,
  sessAvgs,
  sessNums,
} from './store';
// chart grid color
const grid = '#F6F6F6';

// ROLE: take in the analytics data received from fetch requests, and create the plot points, along with labels for x and y axes needed to populate our charts. 
// <--------------- logs/avgLogs COMMENT OUT FOR TESTING ----------------> //
export const createData = (logs, avgLogs) => {
  /*
  /// dummy logs -> for testing purposes -> (comment in for testing)
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
  //// dummy avgLogs -> for testing purposes -> (comment out when live)
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
  // ROLE: Resets charting data
  if (labels.length > 1) {
    labels.length = 0;
    labels.push(0);
    succs.length = 0;
    errs.length = 0;
    pieData.length = 0;
    pieData.push(0);
    pieData.push(0);
    sessAvgs.length = 0;
    sessNums.length = 0;
    currentWorker.length = 0;
  }
  // ROLE: generates new charting data
    // ROLE: sets which worker is being monitored
  currentWorker.push(logs[0].worker);
  // following blocks create data for scatter chart and pie chart
  // sets scatter chart x-axis length
  const duration = workerTimer.stop - workerTimer.start;
  // console.log(`duration: ${duration}`);
  for (let i = 1000; i < duration; i += 1000) {
    labels.push(i);
    if (i + 1000 >= duration) {
      labels.push(i + 1000);
    }
  }
  // ROLE: plots points for scatter chart and total success/errors for pie chart
  for (let i = 0; i < logs.length; i++) {
    // console.log(`log${i}: ${logs[i].start - workerTimer.start}`);
    // ROLE: generates success data for charts
    if (logs[i].status < 300) {
      pieData[0] += 1;
      succs.push({
        x: logs[i].start - workerTimer.start,
        y: logs[i].response_time_ms,
      });
    } else {
      pieData[1] += 1;
      errs.push({
        x: logs[i].start - workerTimer.start,
        y: logs[i].response_time_ms,
      });
    }
  }
  // console.log(`labels ${labels}`);
  // ROLE: creates data for bar graph
    // curSess indexes sessions array
  let curSess = 0;
  const sessions = [[], [], [], [], []];
  // for loop pushes response times into indexed sessions sub-array
  for (let i = 0; i < avgLogs.length; i++) {
    // console.log(`Session number: ${sessNums}`);
    if (i === 0) sessNums.push(avgLogs[i].session_num);
    // when session_num increases, curSess increments to push into next sessions sub-array
    if (avgLogs[i].session_num !== sessNums[curSess]) {
      ++curSess;
      sessNums.push(avgLogs[i].session_num);
    }
    sessions[curSess].push(avgLogs[i].response_time_ms);
  }
  // console.log(sessions);
  // reduces each sessions sub-array to average response time in ms
  sessions.forEach((session) => {
    let total = 0;
    for (let i = 0; i < session.length; i++) {
      total += session[i];
    }
    sessAvgs.push(total / session.length);
  });
  // console.log(`Session number: ${sessNums}`);
  // console.log(`Session Averages: ${sessAvgs}`);
};

// ROLE: specifies configuration of Scatter Chart, and attaches it to ScatterChart.svelte. Configured in accordance with Chart.js documentation guidelines
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

// ROLE: specifies configuration of Pie Chart, and attaches it to PieChart.svelte
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

// // ROLE: specifies configuration of Bar Chart, and attaches it to BarChart.svelte
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
