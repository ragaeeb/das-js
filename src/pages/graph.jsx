import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { heroData } from '../mock/data';
import { monthly } from '../utils/calculator';
import { stringToColour } from '../utils/stringUtils';

const buildDataSet = (label) => {
  const color = stringToColour(label);

  return {
    label,
    fill: false,
    lineTension: 0.1,
    backgroundColor: color,
    borderColor: color,
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderColor: color,
    pointBackgroundColor: '#fff',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: color,
    pointHoverBorderColor: 'rgba(220,220,220,1)',
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
  };
};

const data = {
  datasets: [
    buildDataSet('Fajr'),
    buildDataSet('Sunrise'),
    buildDataSet('Dhuhr'),
    buildDataSet('ʿAṣr'),
    buildDataSet('Maġrib'),
    buildDataSet('ʿIshāʾ'),
    buildDataSet('1/2 Night Begins'),
    buildDataSet('Last 1/3 Night Begins'),
  ],
};

const Graph = () => {
  const { latitude, longitude, timeZone } = heroData;
  const [now] = useState(new Date());
  const { dates, label } = monthly(latitude, longitude, timeZone, now);
  data.labels = dates.map((date, index) => index + 1);

  for (let i = 0; i < data.datasets.length; i += 1) {
    data.datasets[i].data = dates.map(({ timings }) => {
      const d = timings[i].value;
      d.setDate(1);
      d.setMonth(now.getMonth());
      return { y: d };
    });
  }

  return (
    <div>
      <h2>{label}</h2>
      <Line
        data={data}
        options={{
          scales: {
            yAxes: [
              {
                distribution: 'series',
                type: 'time',
                time: {
                  unit: 'minute',
                },
                ticks: {
                  source: 'auto',
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default Graph;
