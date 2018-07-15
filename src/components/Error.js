import React from 'react';

const Error = ({ errorStatus }) => {
  const errRef = {
    500: 'Network Error',
    404: 'Page Not Found',
    400: 'Bad Request'
  };
  return (
    <div className="box error">
      <h3 className="error-msg">
        <span className="icon has-text-warning">
          <i className="fas fa-exclamation-triangle" />
        </span>
        {` ${errRef[errorStatus]}`}
      </h3>
    </div>
  );
};

export default Error;
