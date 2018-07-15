import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import * as api from '../api';
import ArticleLayout from './ArticleLayout';
import Vote from './Vote';
import Comments from './Comments';

class Article extends Component {
  state = {
    article: {},
    error: null
  };

  componentDidMount() {
    const { article_id } = this.props.match.params;
    api
      .getArticleById(article_id)
      .then(article => {
        this.setState({
          article
        });
      })
      .catch(err => {
        const errorStatus = err.response.status ? err.response.status : 500;
        this.setState({ error: errorStatus });
      });
  }

  render() {
    const { article, error } = this.state;
    const { currentUser } = this.props;
    return !error ? (
      <section>
        <div className="box article/main">
          <article className="media">
            <div className="media-left">
              <Vote
                article={article}
                currentUser={currentUser}
                renderVote={this.renderVote}
              />
            </div>
            <ArticleLayout article={article} withComments="true" />
          </article>
        </div>
        {article.comments ? (
          <Comments article={article} currentUser={currentUser} />
        ) : (
          <strong className="comments-header">No comments</strong>
        )}
      </section>
    ) : (
      <Redirect to={`/${error}`} />
    );
  }
}

export default Article;
