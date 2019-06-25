import React from 'react';
import PropTypes from 'prop-types';
import { Autocomplete } from 'react-formik-ui';

import './TypeAhead.css';

const TypeAhead = ({
  name,
  suggestions,
  disabled,
  onChange,
}) => (
  <div className="typeahead">
    <Autocomplete
      name={name}
      suggestions={suggestions}
      disabled={disabled}
      onChange={onChange}
    />
  </div>
);

TypeAhead.defaultProps = {
  disabled: false,
  onChange: () => {},
};

TypeAhead.propTypes = {
  name: PropTypes.string.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

export default TypeAhead;
