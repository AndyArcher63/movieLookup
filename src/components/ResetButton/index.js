import React from 'react';
import PropTypes from 'prop-types';
import Classes from './ResetButton.module.scss';

const ResetButton = props => (
  <div className={Classes.resetWrapper}>
    <button
      className={Classes.button}
      type="button"
      onClick={props.action}
    >
      Reset Filters
    </button>
  </div>
);

ResetButton.propTypes = {
  action: PropTypes.func.isRequired,
};

export default ResetButton;
