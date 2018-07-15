import React from 'react';
import * as api from '../api';

const Votes = props => {
  const voteItemType = Object.keys(props)[0];
  const voteItem = props[voteItemType];
  const { currentUser, renderVote } = props;

  const disableVote = currentUser ? false : true;

  return (
    <aside>
      <button
        className="button is-success is-outlined"
        value="up"
        onClick={e =>
          handleClick(e, voteItem, voteItemType, currentUser, renderVote)
        }
        disabled={disableVote}
      >
        {'⬆️'}
      </button>
      <strong>
        <p id="vote-count">{voteItem.votes}</p>
      </strong>
      <button
        className="button is-danger is-outlined"
        value="down"
        onClick={e =>
          handleClick(e, voteItem, voteItemType, currentUser, renderVote)
        }
        disabled={disableVote}
      >
        {'⬇'}️
      </button>
    </aside>
  );
};

const handleClick = (e, voteItem, voteItemType, currentUser, renderVote) => {
  if (currentUser) {
    let contentType = `${voteItemType}s`;
    const contentId = voteItem._id;
    const voteInc = e.target.value;
    api
      .castVote(contentType, contentId, voteInc)
      .then(data => {
        renderVote(data[voteItemType], voteInc, contentType);
      })
      .catch(err => {
        alert('Vote not counted: please try again later');
      });
  }
};

export default Votes;
