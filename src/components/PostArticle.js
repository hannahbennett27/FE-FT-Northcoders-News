import React, { Component } from 'react';
import * as api from '../api';

class PostArticle extends Component {
  state = {
    topics: [],
    newArticleTitle: '',
    newArticleBody: '',
    newArticleTopic: 'Select Topic'
  };

  componentDidMount() {
    api
      .getTopics()
      .then(topics => {
        this.setState({ topics });
      })
      .catch(err => {
        this.setState({ error: err.response.status });
      });
  }

  render() {
    const { currentUser } = this.props;
    const { topics } = this.state;
    const disablePost = currentUser ? false : true;

    return (
      <div className="box post">
        <div className="field">
          <label className="label">Post New Article</label>
          <div className="control">
            <input
              className="input is-info form"
              type="text"
              placeholder="Title..."
              name="newArticleTitle"
              value={this.state.newArticleTitle}
              onChange={this.handleChange}
              disabled={disablePost}
              required
            />
            <textarea
              className="textarea is-info form"
              type="text"
              placeholder="New article..."
              name="newArticleBody"
              value={this.state.newArticleBody}
              onChange={this.handleChange}
              disabled={disablePost}
            />
            <div className="select is-info form">
              <select
                value={this.state.newArticleTopic}
                name="newArticleTopic"
                onChange={this.handleChange}
                disabled={disablePost}
              >
                <option disabled>Select Topic</option>
                {topics.map(topic => {
                  return <option key={topic._id}>{topic.title}</option>;
                })}
              </select>
            </div>
            <br />
            <button
              className="button is-link"
              onClick={this.handleClick}
              disabled={disablePost}
            >
              Submit
            </button>
            <button
              className="button is-light"
              onClick={this.clearState}
              disabled={disablePost}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClick = e => {
    e.preventDefault();
    const { renderArticle } = this.props;
    const { newArticleTitle, newArticleBody, newArticleTopic } = this.state;
    api
      .postArticle(newArticleTitle, newArticleBody, newArticleTopic)
      .then(article => {
        renderArticle(article);
      })
      .catch(err => {
        alert(
          'Article not posted: please check all fields are completed and try again later'
        );
      });
    this.clearState();
  };

  clearState = () => {
    this.setState({
      newArticleTitle: '',
      newArticleBody: '',
      newArticleTopic: 'Select Topic'
    });
  };
}

export default PostArticle;
