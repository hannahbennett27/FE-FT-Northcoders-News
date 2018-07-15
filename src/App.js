import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as api from './api';
import Header from './components/Header';
import Articles from './components/Articles';
import Article from './components/Article';
import Error from './components/Error';

class App extends Component {
  state = {
    currentUser: 'happyamy2016',
    // currentUser: "",
    error: null
  };
  render() {
    const { currentUser } = this.state;
    return (
      <Router>
        <div className="app">
          <Header
            currentUser={currentUser}
            handleLogout={this.handleLogout}
            handleLogin={this.handleLogin}
          />
          <div className="container is-fluid">
            <div className="section">
              <Route
                exact
                path="/500"
                render={() => <Error errorStatus="500" />}
              />
              <Route
                exact
                path="/404"
                render={() => <Error errorStatus="404" />}
              />
              <Route
                exact
                path="/400"
                render={() => <Error errorStatus="400" />}
              />
              <Route
                exact
                path="/article/:article_id"
                render={props => (
                  <Article {...props} currentUser={currentUser} />
                )}
              />
              <Route
                exact
                path="/:topic"
                render={props => (
                  <Articles {...props} currentUser={currentUser} />
                )}
              />
              <Route
                exact
                path="/"
                render={props => (
                  <Articles {...props} currentUser={currentUser} />
                )}
              />
            </div>
          </div>
        </div>
      </Router>
    );
  }

  handleLogout = () => {
    this.setState({ currentUser: '' });
  };

  handleLogin = () => {
    api
      .getUsernames()
      .then(usernames => {
        const user = prompt('please enter your username:', 'username');
        if (user !== null) {
          if (usernames.includes(user)) {
            this.setState({ currentUser: user });
          }
        }
      })
      .catch(err => {
        this.setState({ error: 500 });
      });
  };
}

export default App;
