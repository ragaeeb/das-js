import React, { useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import Title from '../components/Title';
import { heroData } from '../mock/data';
import calculate from '../utils/calculator';

const TABLE_STYLE = { fontSize: '2.6rem' };

const renderRow = ({ timings }, index) => {
  const [fajr, sunrise, dhuhr, asr, maghrib, isha] = timings;

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{fajr.time}</td>
      <td>{sunrise.time}</td>
      <td>{dhuhr.time}</td>
      <td>{asr.time}</td>
      <td>{maghrib.time}</td>
      <td>{isha.time}</td>
    </tr>
  );
};

const Monthly = () => {
  const { latitude, longitude, timeZone } = heroData;
  const [now] = useState(new Date());
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const times = [];

  for (let i = 1; i <= 31; i += 1) {
    now.setDate(i);
    const timings = calculate(latitude, longitude, timeZone, now, {});
    times.push(timings);

    if (now > lastDayOfMonth) {
      break;
    }
  }

  const monthName = now.toLocaleDateString('en-US', {
    month: 'long',
  });

  const [headings] = times;
  const [fajr, sunrise, dhuhr, asr, maghrib, isha] = headings.timings;

  return (
    <Container>
      <Title title={`${monthName} ${now.getFullYear()}`} />
      <Table striped bordered hover style={TABLE_STYLE}>
        <thead>
          <tr>
            <th>Date</th>
            <th>{fajr.label}</th>
            <th>{sunrise.label}</th>
            <th>{dhuhr.label}</th>
            <th>{asr.label}</th>
            <th>{maghrib.label}</th>
            <th>{isha.label}</th>
          </tr>
        </thead>
        <tbody>{times.map(renderRow)}</tbody>
      </Table>
    </Container>
  );
};

export default Monthly;
