import axios from 'axios';
import Chart from 'chart.js/auto';
import { workerTimer, labels, succs, errs, subReqs, pieData } from './store';

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

    if (randomizer() > 3) {
      const success = randomizer();
      const errors = randomizer();
      const subRequests = randomizer();
      succs.push(success);
      pieData[0] += success;
      errs.push(errors);
      pieData[1] += errors;
      subReqs.push(subRequests);
      pieData[2] += subRequests;
    } else {
      succs.push(0);
      errs.push(0);
      subReqs.push(0);
    }
    if (i + 100 > duration) {
      labels.push(`${i + 100}ms`);
      succs.push(0);
      errs.push(0);
      subReqs.push(0);
    }
  }
};
export const createLineGraph = () => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Successes',
        backgroundColor: 'rgb(45, 161, 105)',
        borderColor: 'rgb(45, 161, 105)',
        data: succs,
      },
      {
        label: 'Errors',
        backgroundColor: 'rgb(181, 43, 50)',
        borderColor: 'rgb(181, 43, 50)',
        data: errs,
      },
      {
        label: 'Sub-Requests',
        backgroundColor: 'rgb(230, 207, 62)',
        borderColor: 'rgb(230, 207, 62)',
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
        },
        y: {
          title: {
            display: true,
            align: 'center',
            text: '# of Requests',
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
        backgroundColor: [
          'rgb(45, 161, 105)',
          'rgb(181, 43, 50)',
          'rgb(230, 207, 62)',
        ],
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
