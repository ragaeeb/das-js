import 'bootstrap/dist/css/bootstrap.min.css';
import addToMailchimp from 'gatsby-plugin-mailchimp';
import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form } from 'react-bootstrap';
import SEO from '../components/seo';
import '../style/main.scss';

const newsletter = () => {
  const [submissionResult, setSubmissionResult] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const [email, firstName, lastName] = event.currentTarget;

    const { result, msg } = await addToMailchimp(email.value, {
      FNAME: firstName.value,
      LNAME: lastName.value,
    });

    setSubmissionResult({
      result: result === 'success' ? 'success' : 'danger',
      msg:
        result === 'success'
          ? msg
          : 'An error occurred in signing you up, please contact us for assistance',
    });
  };

  return (
    <>
      <SEO title="Mailing List" description="Newsletter" />
      <section id="hero" className="jumbotron">
        <Container>
          {submissionResult && (
            <Alert variant={submissionResult.result}>
              <h3>{submissionResult.msg}</h3>
            </Alert>
          )}
          <h2>Mailing List</h2>
          <p>
            If you would like to stay up to date with the latest activities, announcements, events,
            and news regarding the muṣallá, feel free to sign-up for our mailing list to receive
            emails. If at any point in time you wish to unsubscribe, you can always do so.
          </p>
          <br />
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Row>
                <Form.Label column="lg" lg={2}>
                  Email Address
                </Form.Label>
                <Col>
                  <Form.Control
                    type="email"
                    size="lg"
                    required
                    placeholder="Enter your email address (ie: abdullah@gmail.com)"
                  />
                </Col>
              </Form.Row>
              <br />
              <Form.Row>
                <Form.Label column="lg" lg={2}>
                  First Name
                </Form.Label>
                <Col>
                  <Form.Control
                    size="lg"
                    type="text"
                    placeholder="Enter your first name (ie: Abdullah)"
                  />
                </Col>
              </Form.Row>
              <br />
              <Form.Row>
                <Form.Label column="lg" lg={2}>
                  Last Name
                </Form.Label>
                <Col>
                  <Form.Control
                    size="lg"
                    type="text"
                    placeholder="Enter you last name (ie: Ahmad)"
                  />
                </Col>
              </Form.Row>
            </Form.Group>
            <Button
              variant="success"
              type="submit"
              size="lg"
              disabled={submissionResult && submissionResult.result === 'success'}
            >
              Submit
            </Button>
          </Form>
        </Container>
      </section>
    </>
  );
};

export default newsletter;
