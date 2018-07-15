import React from 'react';
import { Link } from 'react-router-dom';

const ArticleLayout = ({ article, withComments }) => {
  return article.body ? (
    <div className="media-content">
      <div className="content">
        <p>
          {withComments === 'true' ? (
            <strong className="article_title">{article.title} </strong>
          ) : (
            <Link to={`/article/${article._id}`}>
              <strong>{article.title} </strong>
            </Link>
          )}
          <small>Posted by {article.created_by}</small>
          <br />
          <small>{article.belongs_to}</small>
          <br />
          {withComments === 'true'
            ? article.body
            : `${article.body.slice(0, 100)}...`}
        </p>
      </div>
      <div>
        {withComments === 'true' ? (
          <p>
            {'💬'} {article.comments} comments
          </p>
        ) : (
          <Link to={`/article/${article._id}`}>
            {'💬'} {article.comments} comments
          </Link>
        )}
      </div>
    </div>
  ) : null;
};

export default ArticleLayout;
