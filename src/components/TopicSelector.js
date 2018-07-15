import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as api from '../api';

class TopicSelector extends Component {
  state = {
    topics: [],
    error: null
  };

  componentDidMount() {
    api
      .getTopics()
      .then(topics => {
        this.setState({ topics });
      })
      .catch(err => {
        this.setState({ error: 500 });
      });
  }

  render() {
    const { topics, error } = this.state;

    return !error ? (
      <div className="navbar-item has-dropdown is-hoverable">
        <button className="navbar-link button">Articles</button>
        <nav className="navbar-dropdown">
          <Link
            to={`/`}
            style={{ textDecoration: 'none' }}
            className="navbar-item button"
          >
            All
          </Link>
          {topics.map(topic => {
            return (
              <Link
                to={`/${topic.slug}`}
                key={topic._id}
                style={{ textDecoration: 'none' }}
                className="navbar-item button"
              >
                {topic.title}
              </Link>
            );
          })}
        </nav>
      </div>
    ) : (
      <Redirect to={`/${error}`} />
    );
  }
}

export default TopicSelector;
