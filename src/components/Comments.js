import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import * as api from '../api';
import Vote from './Vote';
import PostComment from './PostComment';

class Comments extends Component {
  state = {
    comments: [],
    error: null
  };

  componentDidMount() {
    const { article } = this.props;
    article.comments
      ? api
          .getComments(article._id)
          .then(comments => {
            const sortedComments = comments.sort(function(a, b) {
              return b.votes - a.votes;
            });
            this.setState({
              comments: sortedComments
            });
          })
          .catch(err => {
            const errorStatus = err.response.status ? err.response.status : 500;
            this.setState({ error: errorStatus });
          })
      : this.setState({
          comments: []
        });
  }

  render() {
    const { article, currentUser } = this.props;
    const { comments, error } = this.state;

    return !error ? (
      <div className="columns">
        <div className="column">
          <strong className="comments-header">Comments</strong>
          <div>
            <div>
              {comments.map(comment => {
                return (
                  <div key={comment._id} className="box">
                    <div className="media">
                      <div className="media-left">
                        <Vote
                          comment={comment}
                          currentUser={currentUser}
                          renderVote={this.renderVote}
                        />
                      </div>
                      <section>
                        <div className="media-content">
                          <div className="content">
                            <p className="comment-body">
                              <strong>
                                Posted by {comment.created_by} at{' '}
                                {comment.created_at}
                              </strong>
                              <br />
                              {comment.body}
                            </p>
                          </div>
                        </div>
                      </section>
                    </div>
                    {currentUser === comment.created_by && (
                      <div className="delete-div">
                        <button
                          className="delete"
                          value="delete"
                          onClick={() => this.deleteComment(comment._id)}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="column">
          <PostComment
            article={article}
            currentUser={currentUser}
            renderComment={this.renderComment}
          />
        </div>
      </div>
    ) : (
      <Redirect to={`/${error}`} />
    );
  }

  renderVote = (votedContent, voteInc, contentType) => {
    const voteRef = { up: 1, down: -1 };
    const stateType = contentType === 'comments' ? 'comments' : 'article';
    const updatedStateContent =
      stateType === 'comments'
        ? this.state.comments.map(comment => {
            if (comment._id === votedContent._id)
              return {
                ...comment,
                votes: comment.votes + voteRef[voteInc]
              };
            else return comment;
          })
        : {
            ...this.state.article,
            votes: this.state.article.votes + voteRef[voteInc]
          };
    this.setState({ [stateType]: updatedStateContent });
  };

  renderComment = comment => {
    const updatedComments = [comment, ...this.state.comments];
    this.setState({ comments: updatedComments });
  };

  deleteComment = commentId => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      api.deleteComment(commentId).catch(err => {
        this.setState({ error: err.response.status });
      });
      const updatedComments = this.state.comments.filter(comment => {
        return comment._id !== commentId;
      });
      this.setState({ comments: updatedComments });
    }
  };
}

export default Comments;
