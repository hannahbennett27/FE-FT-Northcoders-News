import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import * as api from '../api';
import Vote from './Vote';
import ArticleLayout from './ArticleLayout';
import PostArticle from './PostArticle';

class Articles extends Component {
  state = {
    articles: [],
    error: null
  };

  componentDidMount() {
    const { topic } = this.props.match.params;
    const getArticlesFunc = topic
      ? api.getArticlesByTopic(topic)
      : api.getArticles();

    getArticlesFunc
      .then(articles => {
        const sortedarticles = articles.sort(function(a, b) {
          return b.votes - a.votes;
        });
        this.setState({ articles: sortedarticles });
      })
      .catch(err => {
        this.setState({ error: err.response.status });
      });
  }

  componentDidUpdate(prevProps) {
    const newTopic = this.props.match.params.topic;
    const prevTopic = prevProps.match.params.topic;
    if (newTopic !== prevTopic) {
      api
        .getArticlesByTopic(newTopic)
        .then(articles => {
          const sortedarticles = articles.sort(function(a, b) {
            return b.votes - a.votes;
          });
          this.setState({ articles: sortedarticles });
        })
        .catch(err => {
          this.setState({ error: err.response.status });
        });
    }
  }

  render() {
    const { articles, error } = this.state;
    const { currentUser } = this.props;

    return !error ? (
      <div className="columns">
        <div className="column">
          {articles.map(article => {
            return (
              <div key={article._id} className="box">
                <article className="media">
                  <div className="media-left">
                    <Vote
                      article={article}
                      currentUser={currentUser}
                      renderVote={this.renderVote}
                    />
                  </div>
                  <section>
                    <ArticleLayout article={article} withComments="false" />
                  </section>
                </article>
              </div>
            );
          })}
        </div>
        <div className="column">
          <PostArticle
            currentUser={currentUser}
            renderArticle={this.renderArticle}
          />
        </div>
      </div>
    ) : (
      <Redirect to={`/${error}`} />
    );
  }
  renderVote = (votedArticle, voteInc) => {
    const voteRef = { up: 1, down: -1 };
    const updatedArticles = this.state.articles.map(article => {
      if (article._id === votedArticle._id)
        return {
          ...article,
          votes: article.votes + voteRef[voteInc]
        };
      else return article;
    });
    this.setState({ articles: updatedArticles });
  };

  renderArticle = newArticle => {
    const article = {
      ...newArticle,
      comments: 0
    };
    const updatedArticles = [article, ...this.state.articles];
    this.setState({ articles: updatedArticles });
  };
}

export default Articles;
