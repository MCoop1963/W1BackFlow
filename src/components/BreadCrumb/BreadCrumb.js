import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

import './BreadCrumb.css';

const backStyle = {
  float: 'right',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  border: 'none'
}

const BreadCrumb = ({ currentLink, updateState }) => (
  <div>
      <button
       style={ backStyle }
       onClick={() => {
         updateState({
           redirectToForm: false,
           redirectToHome: true,
         });
       }}
    >&lt;&nbsp;&nbsp;&nbsp;{"Back to 'Find Record'"}</button>
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

  </div>
);

BreadCrumb.propTypes = {
  currentLink: PropTypes.string.isRequired,
  updateState: PropTypes.func.isRequired,
};

export default BreadCrumb;
