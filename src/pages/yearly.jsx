import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import SEO from '../components/seo';
import { heroData } from '../mock/data';
import { yearly } from '../utils/calculator';
import { stringToColour } from '../utils/stringUtils';

const Landscape = () => <style type="text/css">{'@media print{@page {size: landscape}}'}</style>;

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
  ],
};

const Graph = () => {
  const { latitude, longitude, timeZone } = heroData;
  const [now] = useState(new Date());
  const { dates, label } = yearly(latitude, longitude, timeZone, now);
  data.labels = dates.map(({ timings }) => {
    const [fajr] = timings;
    return fajr.value.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  });

  for (let i = 0; i < data.datasets.length; i += 1) {
    data.datasets[i].data = dates.map(({ timings }) => {
      const { value, label: eventName, time } = timings[i];
      const d = new Date(value.getTime());
      d.setDate(1);
      d.setMonth(now.getMonth());
      d.setFullYear(now.getFullYear());

      return { y: d, label: eventName, time };
    });
  }

  return (
    <div>
      <SEO
        title="Yearly Schedule Graph"
        description="Graph of yearly schedule for prayer times for Dar as-Sahaba, Ottawa"
      />
      <Landscape />
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
          tooltips: {
            callbacks: {
              label: ({ index, datasetIndex }, { datasets }) => {
                const current = datasets[datasetIndex].data[index];
                return `${current.label}: ${current.time}`;
              },
            },
          },
        }}
      />
    </div>
  );
};

export default Graph;
