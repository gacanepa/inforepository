import React from 'react';
import PropTypes, { string } from 'prop-types';

const FormRowSelect = ({
  labelText,
  name,
  value,
  handleChange,
  options,
}) => (
  <div className="form-row">
    <label htmlFor={name} className="form-label">
      {labelText || name[0].toUpperCase() + name.slice(1)}
    </label>
    <select
      name={name}
      value={value}
      onChange={handleChange}
      className="form-select"
    >
      {options.map((option, index) => (
        /* OK to ignore this rule when the array is static:
        https://github.com/jsx-eslint/eslint-plugin-react/issues/1123 */
        // eslint-disable-next-line react/no-array-index-key
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

FormRowSelect.defaultProps = {
  labelText: ''
};

FormRowSelect.propTypes = {
  labelText: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(string).isRequired,
};

export default FormRowSelect;
