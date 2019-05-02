import React from 'react';
import PropTypes from 'prop-types';
import Classes from './RatingFilter.module.scss';

const RatingFilter = (props) => {
  const filters = [];
  for (let rating = 0.5; rating <= 10; rating += 0.5) {
    filters.push(<option value={rating} key={rating}>{rating}</option>);
  }
  return (
    <div className={Classes.ratingWrapper}>
      <p className={Classes.ratingTitle}>
        Select A Rating
      </p>
      <select
        className={Classes.selector}
        onChange={props.action}
        disabled={props.activeRating}
        value={props.activeRating}
      >
        <option value={0}>Choose a rating</option>
        {filters}
      </select>
    </div>
  );
};

RatingFilter.propTypes = {
  action: PropTypes.func.isRequired,
  activeRating: PropTypes.number.isRequired,
};

export default RatingFilter;
