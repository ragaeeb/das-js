import React, { useContext } from 'react';
import { Container, Toast } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import { Fade } from 'react-awesome-reveal';
import {
  FaCreditCard,
  FaDonate,
  FaHeart,
  FaMicrophone,
  FaMoneyBillAlt,
  FaMoneyCheckAlt,
  FaPaypal,
} from 'react-icons/fa';
import PortfolioContext from '../context/context';
import { stringToColour } from '../utils/stringUtils';
import Title from './Title';

const FONT_SIZE = '2em';

const avatarToNode = {
  directDeposit: <FaMoneyCheckAlt size={FONT_SIZE} color="green" />,
  heart: <FaHeart size={FONT_SIZE} color="red" />,
  interac: <FaCreditCard size={FONT_SIZE} color="#ebab1f" />,
  khutbah: <FaMicrophone size={FONT_SIZE} />,
  moneyIcon: <FaDonate size={FONT_SIZE} color="green" />,
  money: <FaMoneyBillAlt size={FONT_SIZE} color="darkgreen" />,
  paypal: <FaPaypal size={FONT_SIZE} color="#003087" />,
};

const DonateOption = ({ avatar, title, children, status }) => (
  <Toast style={{ maxWidth: '100%' }}>
    <Toast.Header closeButton={false}>
      {avatarToNode[avatar]}
      <strong className="mr-auto">
        <h4>&nbsp;{title}</h4>
      </strong>
      <small>{status}</small>
    </Toast.Header>
    <Toast.Body>
      <h4>{children}</h4>
    </Toast.Body>
  </Toast>
);

const Donate = () => {
  const {
    donations: {
      directDeposit,
      expenses = [],
      etransfer,
      khutbah,
      paypal,
      reminderDawah,
      reminderReward,
    },
  } = useContext(PortfolioContext);

  const expenseData = expenses.reduce(
    (data, { label, value }) => {
      data.labels.push(label);
      data.datasets[0].data.push(value);
      data.datasets[0].backgroundColor.push(stringToColour(label));

      return data;
    },
    {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [],
        },
      ],
    }
  );

  const totalExpenses = expenseData.datasets[0].data.reduce((total, current) => total + current, 0);

  const onDonateClicked = () => window.analytics && window.analytics.track('PaypalDonateClicked');

  return (
    <section id="donate" className="jumbotron">
      <Container>
        <Title title="Donate" />
        <Fade duration={1000} delay={500}>
          <h2>Why Donate?</h2>
          <center>
            <DonateOption
              avatar="money"
              title="Seeking the Pleasure of Allāh"
              status="(Al-Baqarah 2:262)"
            >
              {
                '{Those who spend their wealth in the Cause of Allah, and do not follow up their gifts with reminders of their generosity or with injury, their reward is with their Lord. On them shall be no fear, nor shall they grieve}'
              }
            </DonateOption>
            {reminderReward && (
              <DonateOption avatar="moneyIcon" title="Collect Your Reward">
                {reminderReward}
              </DonateOption>
            )}
            {reminderDawah && (
              <DonateOption avatar="heart" title="Help Spread the Daʿwah">
                {reminderDawah}
              </DonateOption>
            )}
          </center>
        </Fade>
        <br />
        <br />
        <br />
        <Fade duration={1000} delay={500}>
          <h2>Ways to Donate</h2>
          <center>
            {paypal && (
              <DonateOption avatar="paypal" title="PayPal">
                {' '}
                It is possible and convenient to give online (either one time or automatically)
                using your PayPal account. It’s easy and it’s secure. May Allāh reward you!
                <br />
                <br />
                <a
                  className="cta-btn cta-btn--hero"
                  onClick={onDonateClicked}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={paypal}
                  data-cy="paypal"
                >
                  Donate via PayPal
                </a>
              </DonateOption>
            )}
            {etransfer && (
              <DonateOption avatar="interac" title="E-Transfer">
                {' '}
                If you would like to make manual donations from your bank, you can easily donate
                money via e-transfer to the email address:{' '}
                <strong>
                  {etransfer.substring(0, etransfer.indexOf('@'))}
                  <span style={{ display: 'none' }}>foo</span>
                  {etransfer.substring(etransfer.indexOf('@'))}
                </strong>
              </DonateOption>
            )}
            {directDeposit && (
              <DonateOption avatar="directDeposit" title="Direct Deposit">
                {directDeposit}
              </DonateOption>
            )}
            {khutbah && (
              <DonateOption avatar="khutbah" title="After Jumuʿah Khuṭbah">
                {khutbah}
              </DonateOption>
            )}
          </center>
        </Fade>
        <br />
        <br />
        <br />
        <Fade duration={1000} delay={500}>
          <h2>
            Our Monthly Expenses:{' '}
            {totalExpenses.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' })}
          </h2>
          <Pie
            data={expenseData}
            options={{
              tooltips: {
                callbacks: {
                  label: ({ index }, data) =>
                    data.datasets[0].data[index].toLocaleString('en-CA', {
                      style: 'currency',
                      currency: 'CAD',
                    }),
                },
              },
            }}
          />
        </Fade>
        <br />
        <br />
        <br />
      </Container>
    </section>
  );
};

export default Donate;
