import React from 'react';
import PropTypes from 'prop-types';

const FormRow = ({
  type,
  name,
  value,
  handleChange,
  labelText
}) => (
  <div className="form-row">
    <label htmlFor="name">
      {labelText.length > 0 ? labelText : name[0].toUpperCase() + name.slice(1)}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      onChange={handleChange}
      className="form-input"
      value={value}
    />
  </div>
);

FormRow.defaultProps = {
  labelText: ''
};

FormRow.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  labelText: PropTypes.string,
};

export default FormRow;
