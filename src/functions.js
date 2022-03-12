import axios from 'axios';
import Chart from 'chart.js/auto';
import {
  workerTimer,
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
export const createData = () => {
  const duration = workerTimer.stop - workerTimer.start;
  const randomizer = () => Math.trunc(Math.random() * 6 + 1);
  for (let i = 100; i < duration; i += 100) {
    labels.push(`${i}ms`);
    labelsCache.push(`${i}ms`);

    if (randomizer() > 3) {
      const success = randomizer();
      const errors = randomizer();
      const subRequests = randomizer();
      succs.push(success);
      succsCache.push(success);
      pieData[0] += success;
      pieDataCache[0] += success;
      errs.push(errors);
      errsCache.push(errors);
      pieData[1] += errors;
      pieDataCache[1] += errors;
      subReqs.push(subRequests);
      subReqsCache.push(subRequests);
      pieData[2] += subRequests;
      pieDataCache[2] += subRequests;
    } else {
      succs.push(0);
      succsCache.push(0);
      errs.push(0);
      errsCache.push(0);
      subReqs.push(0);
      subReqsCache.push(0);
    }
    if (i + 100 > duration) {
      labels.push(`${i + 100}ms`);
      labelsCache.push(`${i + 100}ms`);
      succs.push(0);
      succsCache.push(0);
      errs.push(0);
      errsCache.push(0);
      subReqs.push(0);
      subReqsCache.push(0);
    }
  }
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

// export const createLineGraphCache = () => {
//   const data = {
//     labels: labelsCache,
//     datasets: [
//       {
//         label: 'Successes',
//         backgroundColor: 'rgb(255, 99, 255)', //pink
//         borderColor: 'rgb(255, 99, 255)',
//         data: succsCache,
//       },

//       {
//         label: 'Errors',
//         backgroundColor: 'rgb(255, 167, 99)', //orange
//         borderColor: 'rgb(255, 167, 99)',
//         data: errsCache,
//       },

//       {
//         label: 'Sub-Requests',
//         backgroundColor: 'rgb(96, 17, 166)', //purple
//         borderColor: 'rgb(96, 17, 166)',
//         data: subReqsCache,
//       },
//     ],
//   };

//   const config = {
//     type: 'line',
//     data: data,
//     options: {
//       responsive: true,
//       maintainAspectRatio: false,
//       scales: {
//         x: {
//           title: {
//             display: true,
//             align: 'center',
//             text: 'Time in milliseconds',
//           },
//           grid: {
//             color: grid,
//           },
//         },
//         y: {
//           title: {
//             display: true,
//             align: 'center',
//             text: '# of Requests',
//           },
//           grid: {
//             color: grid,
//           },
//         },
//       },
//     },
//   };

//   const myChart = new Chart(document.getElementById('myChart'), config);
// };
// export const createPieChartCache = () => {
//   const pieLabels = ['Success', 'Errors', 'Sub-Requests'];
//   const data = {
//     labels: pieLabels,
//     datasets: [
//       {
//         label: 'Worker Activity',
//         backgroundColor: [
//           'rgb(255, 99, 255)',
//           'rgb(255, 167, 99)',
//           'rgb(96, 17, 166)',
//         ],
//         data: pieDataCache,
//         hoverOffset: 4,
//       },
//     ],
//   };

//   const config = {
//     type: 'doughnut',
//     data: data,
//     options: {
//       responsive: true,
//       maintainAspectRatio: true,
//       legend: {
//         display: true,
//         labels: {
//           fontSize: 30,
//         },
//       },
//     },
//   };

//   const doughnutChart = new Chart(
//     document.getElementById('doughnutChart'),
//     config
//   );
// };

// export const createBarChartCache = () => {
//   const barLabels = ['Day 1', 'Day 2', 'Day 3'];

//   const data = {
//     labels: barLabels,
//     datasets: [
//       {
//         label: 'Worker 1',
//         backgroundColor: ['rgb(255, 99, 255)'], //pink
//         data: [10, 20, 30],
//         borderWidth: 1,
//       },
//       {
//         label: 'Worker 2',
//         backgroundColor: ['rgb(255, 167, 99)'], //orange
//         data: [3, 6, 9],
//         borderWidth: 1,
//       },
//       {
//         label: 'Worker 3',
//         backgroundColor: ['rgb(96, 17, 166)'], //purple
//         data: [7, 2, 49],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const config = {
//     type: 'bar',
//     data: data,
//     options: {
//       scales: {
//         x: {
//           beginAtZero: true,
//           stacked: true,
//           grid: {
//             color: grid,
//             display: true,
//           },
//         },
//         y: {
//           beginAtZero: true,
//           stacked: true,
//           grid: {
//             color: grid,
//             display: true,
//           },
//         },
//       },
//     },
//   };

//   const stackedBar = new Chart(document.getElementById('barChart'), config);
// };
