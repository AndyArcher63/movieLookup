import React from 'react';
import PropTypes from 'prop-types';
import Classes from './Filters.module.scss';

const Filters = (props) => {
  const currentFilters = props.filteredGenres.map((filter) => {
    const filterObj = props.genres.filter(genre => genre.id === filter);
    return (
      <button
        className={Classes.button}
        type="button"
        key={filterObj[0].id}
        onClick={() => props.action(filterObj[0].id)}
        disabled={props.activeFilters.includes(filterObj[0].id)}
      >
        {filterObj[0].name}
      </button>
    );
  });
  return (
    <div className={Classes.filterWrapper}>
      <p className={Classes.filterTitle}>Select a Genre</p>
      {currentFilters}
    </div>
  );
};

Filters.propTypes = {
  filteredGenres: PropTypes.arrayOf(PropTypes.number).isRequired,
  genres: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeFilters: PropTypes.arrayOf(PropTypes.number).isRequired,
  action: PropTypes.func.isRequired,
};

export default Filters;
