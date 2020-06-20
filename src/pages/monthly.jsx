import React, { useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import SEO from '../components/seo';
import Title from '../components/Title';
import { heroData } from '../mock/data';
import { monthly } from '../utils/calculator';

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
  const { dates, label } = monthly(latitude, longitude, timeZone, now);

  const [headings] = dates;
  const [fajr, sunrise, dhuhr, asr, maghrib, isha] = headings.timings;

  return (
    <Container>
      <SEO
        title="Monthly Schedule"
        description="Monthly schedule for prayer times for Dar as-Sahaba, Ottawa"
      />
      <Title title={label} />
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
        <tbody>{dates.map(renderRow)}</tbody>
      </Table>
    </Container>
  );
};

export default Monthly;
