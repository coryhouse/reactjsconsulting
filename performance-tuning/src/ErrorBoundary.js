import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <>
          <h1>Something went wrong.</h1>{" "}
          <p> Sorry, an error occurred. Please try again later.</p>
        </>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
