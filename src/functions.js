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
  succsCache,
  errsCache,
  subReqsCache,
  pieDataCache,
} from './store';
//import colors from '../public/global.scss';

const grid = '#F6F6F6';

export const testRequest = () => {
  // NOT FUNCTIONAL YET //
  workerTimer.requestStart = performance.now();
  async () => {
    try {
      await axios.get('http://localhost:3000/');
    } catch (err) {
      console.log(err);
    }
  };
  workerTimer.requestComplete = performance.now();
};

export const mockDBRequest = () => {
  axios
    .get('http://localhost:3000/')
    .then((data) => {
      data.json();
    })
    .then((result) => {
      const logs = result.logs;
      console.log(logs);
      for (let i = 0; i < logs.length; i++) {
        mockLogArray.push(logs[i]);
      }
    });
};

export const createData = (logs) => {
  // RESET CHARTING DATA
  if (labels.length > 1) {
    labels.length = 0;
    labels.push(0);
    succs.length = 0;
    succs.push(0);
    errs.length = 0;
    errs.push(0);
    subReqs.length = 0;
    subReqs.push(0);
    pieData.length = 0;
    pieData.push(0);
    pieData.push(0);
    pieData.push(0);
  }
  // GENERATE NEW CHARTING DATA
  const duration = workerTimer.stop - workerTimer.start;
  for (let i = 50; i < duration; i += 50) {
    labels.push(i);
    succs.push(0);
    errs.push(0);
    subReqs.push(0);
    if (i + 50 >= duration) {
      labels.push(i + 50);
      succs.push(0);
      errs.push(0);
      subReqs.push(0);
    }
  }
  // CREATING DUMMY REQUEST TIMES AND PLOTTING PIE DATA
  const requestTimes = [];
  console.log('these are the request times', requestTimes);
  for (let i = 0; i < logs.length; i++) {
    requestTimes.push(Math.trunc(Math.random() * duration));
    if (logs[i].status < 300 && logs[i].status !== 204) pieData[0] += 1;
    if (logs[i].status > 299 && logs[i].status < 500) pieData[1] += 1;
    if (logs[i].status === 204) pieData[2] += 1;
  }

  // SORTING DUMMY REQUEST TIMES AND PLOTTING SUCCS/ERRS/SUBREQS
  console.log(requestTimes);
  const sortedReqTimes = requestTimes.slice().sort((a, b) => a - b);
  const logsSlice = logs.slice();
  console.log(`sorted Req Times: ${sortedReqTimes}`);
  for (let i = 0; i < labels.length; i++) {
    const label = labels[i];
    console.log('outer for loop hit');

    for (let j = 0; j < logsSlice.length; j++) {
      console.log(sortedReqTimes[j]);
      console.log('hello');
      if (Math.abs(sortedReqTimes[j] - label) <= 25) {
        logsSlice[j].status >= 200 &&
        logsSlice[j].status !== 204 &&
        logsSlice[j].status < 300
          ? (succs[i] += 1)
          : logsSlice[j].status >= 300
          ? (errs[i] += 1)
          : (subReqs[i] += 1);
        logsSlice.shift();
        sortedReqTimes.shift();
      }
    }
  }

  console.log(`labels ${labels}`);
  console.log(`req times ${requestTimes}`);
  console.log(`successes ${succs}`);
  console.log(`errors ${errs}`);
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
      },

      {
        label: 'Errors',
        backgroundColor: '#FF9E01', //orange
        borderColor: '#FF9E01',
        data: errs,
      },

      {
        label: 'Sub-Requests',
        backgroundColor: '#D0EAFF', //lighter blue
        borderColor: '#D0EAFF',
        data: subReqs,
      },
    ],
  };

  const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          min: 0,
          title: {
            display: true,
            align: 'center',
            text: 'Time in milliseconds',
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
            text: '# of Requests',
          },
          grid: {
            color: grid /*'rgb(18, 16, 16)'*/,
          },
        },
      },
    },
  };

  const myChart = new Chart(document.getElementById('myChart'), config);
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
