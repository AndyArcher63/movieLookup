import React, { PureComponent, Fragment } from 'react';
import Film from '../../components/Film';
import Filters from '../../components/Filters';
import RatingFilter from '../../components/RatingFilter';
import ResetButton from '../../components/ResetButton';
import { getNowPlayingMovies, getFilmGenres } from '../../api/requests';
import orderByPopularity from '../../utility';
import Classes from './Films.module.css';

class Films extends PureComponent {
  state = {
    films: [],
    filteredFilms: [],
    genres: [],
    filteredGenres: [],
    activeFilters: [],
    activeRating: 0,
  }

  componentDidMount() {
    this.init();
  }

  async getCurrentPlayingFilms() {
    const results = await getNowPlayingMovies();
    const orderedResults = orderByPopularity(results.data.results);
    this.setState({
      films: orderedResults,
      filteredFilms: orderedResults,
    });
  }

  async getGenres() {
    const results = await getFilmGenres();
    this.setState({
      genres: results.data.genres,
    });
    this.filterGenres();
  }

  toggleFilter = (value) => {
    this.setState(prevState => ({
      activeFilters: [...prevState.activeFilters, value],
    }), () => {
      this.filterFilms();
    });
  };

  resetFilters = () => {
    this.setState(prevState => ({
      activeFilters: [],
      activeRating: 0,
      filteredFilms: prevState.films,
    }), () => {
      this.filterGenres();
    });
  }

  changeRating = (e) => {
    this.setState({
      activeRating: e.target.value,
    }, () => {
      this.updateRating();
    });
  }

  updateRating = () => {
    const currentFilteredFilms = [...this.state.filteredFilms];
    const filterByRating = currentFilteredFilms.filter(film => (
      film.vote_average > this.state.activeRating
    ));
    this.setState({
      filteredFilms: filterByRating,
    }, () => {
      this.filterGenres();
    });
  };

  filterFilms() {
    const currentFilteredFilms = [...this.state.filteredFilms];

    const filteredFilms = currentFilteredFilms.filter((film) => {
      let validFilm = false;
      this.state.activeFilters.forEach((genreId) => {
        if (film.genre_ids.includes(genreId)) {
          validFilm = true;
        } else {
          validFilm = false;
        }
      });
      return validFilm ? film : null;
    });

    this.setState({
      filteredFilms,
    }, () => {
      this.filterGenres();
    });
  }

  filterGenres() {
    this.setState({
      filteredGenres: [],
    });
    const filteredGenres = [];
    this.state.filteredFilms.forEach((genre) => {
      genre.genre_ids.forEach((id) => {
        if (!filteredGenres.includes(id)) {
          filteredGenres.push(id);
        }
      });
    });
    this.setState({
      filteredGenres,
    });
  }

  async init() {
    await this.getCurrentPlayingFilms();
    this.getGenres();
  }

  render() {
    if (this.state.films.length === 0 || this.state.genres.length === 0) {
      return null;
    }
    const AllFilms = this.state.filteredFilms.map(film => (
      <Film
        key={film.id}
        data={film}
        genres={this.state.genres}
      />
    ));

    return (
      <Fragment>
        <Filters
          filteredGenres={this.state.filteredGenres}
          genres={this.state.genres}
          activeFilters={this.state.activeFilters}
          action={this.toggleFilter}
        />
        <RatingFilter
          action={this.changeRating}
          activeRating={this.state.activeRating}
        />
        {(this.state.activeFilters.length > 0 || this.state.activeRating > 0)
          && (
            <ResetButton
              action={this.resetFilters}
            />
          )
        }
        <div className={Classes.wrapper}>
          {this.state.filteredFilms.length > 0 ? (
            <Fragment>
              {AllFilms}
            </Fragment>
          ) : (
            <div>No results match your criteria</div>
          )
          }
        </div>
      </Fragment>
    );
  }
}

export default Films;
