import { captureException, configureScope } from '@sentry/browser';
import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    configureScope((scope) => {
      Object.keys(errorInfo).forEach((key) => {
        scope.setExtra(key, errorInfo[key]);
      });
    });
    captureException(error);
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;

    if (error) {
      return <h1>Something went wrong!</h1>;
    }

    return children;
  }
}
