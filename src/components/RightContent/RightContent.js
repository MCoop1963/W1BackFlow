import React from 'react';
import PropTypes from 'prop-types';

import './RightContent.css';

const RightContent = ({ children }) => (
  <div className="right-content">
    {children}
  </div>
);

RightContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RightContent;
