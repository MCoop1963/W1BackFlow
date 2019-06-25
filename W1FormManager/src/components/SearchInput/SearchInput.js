import React from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';

const SearchInput = ({ name, placeholder, onBlur }) => (
  <div className="input-group">
    <input
      type="text"
      className="form-control"
      placeholder={placeholder}
      name={name}
      onBlur={onBlur}
    />
    <div className="input-group-append">
      <span className="input-group-text">
        <FaSearch />
      </span>
    </div>
  </div>
);

SearchInput.defaultProps = {
  placeholder: '',
  onBlur: () => {},
};

SearchInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
};

export default SearchInput;
