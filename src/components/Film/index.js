import React from 'react';
import PropTypes from 'prop-types';
import Classes from './Film.module.scss';


const Film = ({ data }) => (
  <div className={Classes.film}>
    <img src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} alt={data.title} />
    {data.title}
    {data.genre}
  </div>
);

Film.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Film;
