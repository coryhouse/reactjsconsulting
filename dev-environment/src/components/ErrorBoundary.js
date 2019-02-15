import React from "react";

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <>
          <h1>Oops!</h1>
          <p>Sorry, an error occurred. Please reload the page and try again.</p>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
