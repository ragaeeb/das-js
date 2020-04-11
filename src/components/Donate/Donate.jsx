import React, { useContext, useEffect, useState } from 'react';
import { Container, Toast } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import Fade from 'react-reveal/Fade';
import PortfolioContext from '../../context/context';
import Title from '../Title/Title';

const DonateOption = ({ avatar, title, children, status }) => {
  return (
    <Toast style={{ width: '900px', maxWidth: '1000px' }}>
      <Toast.Header closeButton={false}>
        <img src={avatar} width="20px" height="20px" className="rounded mr-2" alt="" />
        <strong className="mr-auto">
          <h4>{title}</h4>
        </strong>
        <small>{status}</small>
      </Toast.Header>
      <Toast.Body>
        <h4>{children}</h4>
      </Toast.Body>
    </Toast>
  );
};

const stringToColour = str => {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    // eslint-disable-next-line no-bitwise
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = '#';
  for (let i = 0; i < 3; i += 1) {
    // eslint-disable-next-line no-bitwise
    const value = (hash >> (i * 8)) & 0xff;
    colour += `00${value.toString(16)}`.substr(-2);
  }
  return colour;
};

const Header = () => {
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

  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 769) {
      setIsDesktop(true);
      setIsMobile(false);
    } else {
      setIsMobile(true);
      setIsDesktop(false);
    }
  }, []);

  const totalExpenses = expenseData.datasets[0].data.reduce((total, current) => total + current, 0);

  return (
    <section id="donate" className="jumbotron">
      <Container>
        <Title title="Donate" />
        <Fade left={isDesktop} bottom={isMobile} duration={1000} delay={1000} distance="30px">
          <h2>Why Donate?</h2>
          <center>
            <DonateOption
              avatar="https://img.icons8.com/plasticine/2x/money.png"
              title="Seeking the Pleasure of Allāh"
              status="(Al-Baqarah 2:262)"
            >
              {
                '{Those who spend their wealth in the Cause of Allah, and do not follow up their gifts with reminders of their generosity or with injury, their reward is with their Lord. On them shall be no fear, nor shall they grieve}'
              }
            </DonateOption>
            <DonateOption
              avatar="https://blacklabelagency.com/wp-content/uploads/2017/08/money-icon.png"
              title="Collect Your Reward"
            >
              For as long as the muṣallá remains open by your donations, you are collecting your
              reward for every person who is establishing the prayer, for every lesson that is being
              organized and every Muslim who is learning from the lesson, from every lost youth
              seeking the truth and changes their life around by way of it. You are collecting your
              reward for everyone that is affected by your good deeds.
            </DonateOption>
            <DonateOption
              avatar="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/160px-Heart_coraz%C3%B3n.svg.png"
              title="Help Spread the Daʿwah"
            >
              When you participate in online giving, you’re also helping to streamline
              administrative overhead costs – thus, putting more of your dollars to work in keeping
              the muṣallá running.
            </DonateOption>
          </center>
        </Fade>
        <br />
        <br />
        <br />
        <Fade left={isDesktop} bottom={isMobile} duration={1000} delay={1000} distance="30px">
          <h2>Ways to Donate</h2>
          <center>
            <DonateOption
              avatar="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/250_Paypal_logo-512.png"
              title="PayPal"
            >
              {' '}
              It is possible and convenient to give online (either one time or automatically) using
              your PayPal account. It’s easy and it’s secure. May Allāh reward you!
              <br />
              <br />
              <a
                className="cta-btn cta-btn--hero"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=M36T4MXQHLUHJ&source=url"
              >
                Donate via PayPal
              </a>
            </DonateOption>
            <DonateOption
              avatar="https://static.wixstatic.com/media/d16608_9f68dcfa6514454b83b9c966106bcdde~mv2.jpg/v1/fill/w_314,h_314,al_c,lg_1,q_85/d16608_9f68dcfa6514454b83b9c966106bcdde~mv2.jpg"
              title="E-Transfer"
            >
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
            <DonateOption
              avatar="https://cdn1.iconfinder.com/data/icons/ios-11-glyphs/30/money_bag-512.png"
              title="Direct Deposit"
            >
              If you would like your monthly donation amount to be automatically deducted from your
              bank account, we have a direct-deposit form available that you can fill out. Simply
              drop by the muṣallá when any of the administration is there and ask for the form so
              that we can get you set up in shā’ Allah.
            </DonateOption>
            <DonateOption
              avatar="https://cdn1.iconfinder.com/data/icons/modern-universal/32/icon-39-512.png"
              title="After Jumuʿah Khuṭbah"
            >
              After the Friday sermon, donations for the muṣallá are collected. Sometimes there are
              baked goods and food that are also being sold for fundraising for the muṣallá. Please
              donate generously for the sake of Allāh.
            </DonateOption>
          </center>
        </Fade>
        <br />
        <br />
        <br />
        <Fade left={isDesktop} bottom={isMobile} duration={1000} delay={1000} distance="30px">
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
        </Fade>
        <br />
        <br />
        <br />
      </Container>
    </section>
  );
};

export default Header;
