import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

import './BreadCrumb.css';

const BreadCrumb = ({ currentLink, updateState }) => (
  <ul id="BreadCrumb">
    <li>
      <button
        type="button"
        onClick={() => {
          updateState({
            redirectToForm: false,
            redirectToHome: true,
          });
        }}
      >
        Find Record
      </button>
    </li>
    <li>{`#${currentLink}`}</li>
  </ul>
);

BreadCrumb.propTypes = {
  currentLink: PropTypes.string.isRequired,
  updateState: PropTypes.func.isRequired,
};

export default BreadCrumb;
