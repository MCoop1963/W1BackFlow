import React from 'react';
import PropTypes from 'prop-types';

import './SideBar.css';

const SideBar = ({ children }) => (
  <div className="sidebar">
    {children}
  </div>
);

SideBar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SideBar;
