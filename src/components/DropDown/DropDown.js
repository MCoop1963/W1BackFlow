import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'react-formik-ui';

import './DropDown.css';

const DropDown = ({ name, placeholder, options }) => (
  <div className="dropdown">
    <Select
      name={name}
      placeholder={placeholder}
      options={options}
    />
  </div>
);

DropDown.defaultProps = {
  placeholder: 'Select an option',
};

DropDown.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DropDown;
