import React, { Suspense } from "react";
import { Router } from "@reach/router";
import Spinner from "./Spinner";
import ErrorBoundary from "./ErrorBoundary";
import Home from "./Home";
import Nav from "./Nav";
import "./App.css";

// Lazy load about page
const About = React.lazy(() => import("./About"));

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Nav />
        <Suspense fallback={<Spinner />}>
          <Router>
            <Home path="/" />
            <About path="about" />
          </Router>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
