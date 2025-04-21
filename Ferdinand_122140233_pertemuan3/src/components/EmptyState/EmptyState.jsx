import React from 'react';
import PropTypes from 'prop-types';
import './EmptyState.css';

const EmptyState = ({ message }) => {
  return (
    <div className="empty-state">
      <div className="empty-icon">📚</div>
      <p>{message}</p>
    </div>
  );
};

EmptyState.propTypes = {
  message: PropTypes.string.isRequired
};

export default EmptyState;