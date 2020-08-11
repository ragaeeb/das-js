import React, { useContext } from 'react';
import { Container, Toast } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
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
import ScreenFade from './ScreenFade';
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

const DonateOption = ({ avatar, title, children, status }) => {
  return (
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
};

const Donate = () => {
  const {
    donations: { expenses = [] },
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

  const onDonateClicked = () => window.analytics.track('PaypalDonateClicked');

  return (
    <section id="donate" className="jumbotron">
      <Container>
        <Title title="Donate" />
        <ScreenFade>
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
            <DonateOption avatar="moneyIcon" title="Collect Your Reward">
              For as long as the muṣallá remains open by your donations, you are collecting your
              reward for every person who is establishing the prayer, for every lesson that is being
              organized and every Muslim who is learning from the lesson, from every lost youth
              seeking the truth and changes their life around by way of it. You are collecting your
              reward for everyone that is affected by your good deeds.
            </DonateOption>
            <DonateOption avatar="heart" title="Help Spread the Daʿwah">
              When you participate in online giving, you’re also helping to streamline
              administrative overhead costs – thus, putting more of your dollars to work in keeping
              the muṣallá running.
            </DonateOption>
          </center>
        </ScreenFade>
        <br />
        <br />
        <br />
        <ScreenFade>
          <h2>Ways to Donate</h2>
          <center>
            <DonateOption avatar="paypal" title="PayPal">
              {' '}
              It is possible and convenient to give online (either one time or automatically) using
              your PayPal account. It’s easy and it’s secure. May Allāh reward you!
              <br />
              <br />
              <a
                className="cta-btn cta-btn--hero"
                onClick={onDonateClicked}
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=M36T4MXQHLUHJ&source=url"
              >
                Donate via PayPal
              </a>
            </DonateOption>
            <DonateOption avatar="interac" title="E-Transfer">
              {' '}
              If you would like to make manual donations from your bank, you can easily donate money
              via e-transfer to the email address:{' '}
              <strong>
                dar.as.sahaba<span style={{ display: 'none' }}>foo</span>
                @hotmail.com
              </strong>
              <br />
              <br />
              Please use the answer: <strong>maintenance expense</strong>.
            </DonateOption>
            <DonateOption avatar="directDeposit" title="Direct Deposit">
              If you would like your monthly donation amount to be automatically deducted from your
              bank account, we have a direct-deposit form available that you can fill out. Simply
              drop by the muṣallá when any of the administration is there and ask for the form so
              that we can get you set up in shā’ Allah.
            </DonateOption>
            <DonateOption avatar="khutbah" title="After Jumuʿah Khuṭbah">
              After the Friday sermon, donations for the muṣallá are collected. Sometimes there are
              baked goods and food that are also being sold for fundraising for the muṣallá. Please
              donate generously for the sake of Allāh.
            </DonateOption>
          </center>
        </ScreenFade>
        <br />
        <br />
        <br />
        <ScreenFade>
          <h2>
            Our Monthly Expenses:{' '}
            {totalExpenses.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' })}
          </h2>
          <Pie
            data={expenseData}
            options={{
              tooltips: {
                callbacks: {
                  label: ({ index }, data) => {
                    return data.datasets[0].data[index].toLocaleString('en-CA', {
                      style: 'currency',
                      currency: 'CAD',
                    });
                  },
                },
              },
            }}
          />
        </ScreenFade>
        <br />
        <br />
        <br />
      </Container>
    </section>
  );
};

export default Donate;
