import React from 'react';
import PropTypes from 'prop-types';
import { Datepicker } from 'react-formik-ui';

import './W1DatePicker.css';
import calendarIcon from '../../img/calendar-icon.png';

const W1DatePicker = ({ name, onBlur }) => (
  <div className="datepicker">
    <Datepicker
      name={name}
      className="datepicker"
      onBlur={onBlur}
    />
    <img src={calendarIcon} className="datepickerIcon" alt="" />
  </div>
);

W1DatePicker.defaultProps = {
  onBlur: () => {},
};

W1DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
};

export default W1DatePicker;
