import React from 'react';
import PropTypes from 'prop-types';

export default function Switch({ isMobile, isOn, handleToggle }) {
  return (
    <button
      type="button"
      className={isMobile ? 'switch-toggle-mobile' : 'switch-toggle'}
      onClick={handleToggle}>
      <span className="switch-text">{isOn ? 'C' : 'F'}</span>
    </button>
  );
}
Switch.propTypes = {
  isMobile: PropTypes.bool,
  isOn: PropTypes.bool.isRequired,
  handleToggle: PropTypes.func.isRequired,
};
