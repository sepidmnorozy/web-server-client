import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import W2V from "./components/layout/W2V";
import TFIDF from "./components/layout/TFIDF";
import TestServer from "./components/layout/test";
import ElasticSearchComponent from "./components/layout/ElasticSearchComponent";
import OldSearchComponent from "./components/layout/OldSearchComponent";
import NewsPage from "./components/layout/NewsPage";
import HomePage from "./components/layout/HomePage";
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/w2v" component={W2V} />
          <Route exact path="/tfidf" component={TFIDF} />
          <Route exact path="/test" component={TestServer} />
          <Route exact path="/search" component={ElasticSearchComponent} />
          <Route exact path="/newsPage" component={NewsPage} />
          <Route exact path="/oldsearch" component={OldSearchComponent} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;

