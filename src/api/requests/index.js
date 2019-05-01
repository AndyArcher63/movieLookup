import api from '../client';

const getNowPlayingMovies = () => (
  api(`/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-GB&page=1`)
);

const getFilmGenres = () => (
  api(`/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-GB`)
);

export { getNowPlayingMovies, getFilmGenres };
