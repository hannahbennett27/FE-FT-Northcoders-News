import React, { Component } from 'react';
import * as api from '../api';

class PostComment extends Component {
  state = {
    newComment: ''
  };

  render() {
    const { newComment } = this.state;
    const { currentUser } = this.props;
    const disablePost = currentUser ? false : true;

    return (
      <div className="box post">
        <div className="field">
          <label className="label">Post New Comment</label>
          <div className="control">
            <textarea
              className="textarea is-info form"
              type="text"
              placeholder="New comment..."
              value={newComment}
              onChange={this.handleChange}
              disabled={disablePost}
            />
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
    this.setState({ newComment: e.target.value });
  };

  handleClick = () => {
    const {
      article: { _id: articleId },
      renderComment
    } = this.props;
    const { newComment } = this.state;

    api
      .postComment(articleId, newComment)
      .then(comment => {
        renderComment(comment);
      })
      .catch(err => {
        alert(
          'Comment not posted: please check all fields are completed and try again later'
        );
      });
    this.clearState();
  };

  clearState = () => {
    this.setState({
      newComment: ''
    });
  };
}

export default PostComment;
