import React from 'react';
import PropTypes from 'prop-types';

import xIcon from '../../img/x-icon.png';
import './ModalDialog.css';

const ModalDialog = ({ isOpen, onCloseClick, children }) => {
  const dialog = (
    <div className="ModalDialog">
      <div className="overlay" />
      <div className="content">
        <button type="button" className="close" onClick={onCloseClick}>
          <img src={xIcon} alt="Close" />
        </button>
        {children}
      </div>
    </div>
  );

  return isOpen ? dialog : null;
};

ModalDialog.defaultProps = {
  isOpen: false,
};

ModalDialog.propTypes = {
  children: PropTypes.node.isRequired,
  onCloseClick: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
};

export default ModalDialog;
