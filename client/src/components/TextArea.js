import React from 'react';
import PropTypes from 'prop-types';

const TextArea = ({
  labelText,
  name,
  value,
  handleChange,
  rows,
  cols,
}) => (
  <div className="form-row">
    <label htmlFor={name} className="form-label">
      {labelText || name[0].toUpperCase() + name.slice(1)}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={handleChange}
      className="form-textarea"
      rows={rows}
      cols={cols}
    />
  </div>
);

TextArea.defaultProps = {
  labelText: '',
  rows: 5,
  cols: 40,
};

TextArea.propTypes = {
  labelText: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  rows: PropTypes.number,
  cols: PropTypes.number,
};

export default TextArea;
