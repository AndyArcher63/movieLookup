import React from 'react';
import PropTypes from 'prop-types';
import Classes from './Film.module.scss';


const Film = (props) => {
  const genres = props.data.genre_ids.map((genre) => {
    const genreLabel = props.genres.filter(genreId => genreId.id === genre);
    return (
      <li
        key={genre}
        className={Classes.genreListItem}
      >
        {genreLabel[0].name}
      </li>
    );
  });
  return (
    <div className={Classes.film}>
      <img src={`https://image.tmdb.org/t/p/w500/${props.data.poster_path}`} alt={props.data.title} />
      <h3 className={Classes.title}>{props.data.title}</h3>
      <ul className={Classes.genreList}>
        {genres}
      </ul>
    </div>
  );
};

Film.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  genres: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Film;
