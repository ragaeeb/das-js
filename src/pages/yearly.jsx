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

const Graph = () => {
  const { calculation, labels } = heroData;
  const [now, setNow] = useState(new Date());

  const nextYear = (delta = 1) => () => {
    const newDate = new Date(now.valueOf());
    newDate.setFullYear(newDate.getFullYear() + delta);
    setNow(newDate);

    if (window.analytics) {
      window.analytics.track(delta === 1 ? 'NextYearTimings' : 'PrevYearTimings');
    }
  };

  const { dates, label } = yearly(labels, calculation, now);

  const data = {
    datasets: [
      buildDataSet(labels.fajr),
      buildDataSet(labels.sunrise),
      buildDataSet(labels.dhuhr),
      buildDataSet(labels.asr),
      buildDataSet(labels.maghrib),
      buildDataSet(labels.isha),
    ],
  };
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
      <h2>
        <button
          type="button"
          className="arrow-button cta-btn"
          onClick={nextYear(-1)}
          style={{ backgroundColor: 'transparent', border: 'none', outline: 'none' }}
        >
          &lt;
        </button>
        {label}
        <button
          type="button"
          className="arrow-button cta-btn"
          onClick={nextYear(1)}
          style={{ backgroundColor: 'transparent', border: 'none', outline: 'none' }}
        >
          &gt;
        </button>
      </h2>
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
          responsive: true,
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
