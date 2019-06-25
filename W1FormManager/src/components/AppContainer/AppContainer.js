import React from 'react';
import PropTypes from 'prop-types';

import './AppContainer.css';

const AppContainer = ({ children }) => (
  <div className="App">
    <div className="container">
      {children}
    </div>
  </div>
);

AppContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContainer;
