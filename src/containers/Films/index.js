import React, { PureComponent, Fragment } from 'react';
import Film from '../../components/Film';
import { getNowPlayingMovies, getFilmGenres } from '../../api/requests';
import { orderByPopularity } from '../../utility';
import Classes from './Films.module.css';

class Films extends PureComponent {
  state = {
    films: [],
    filteredFilms: [],
    genres: [],
    filteredGenres: [],
    activeFilters: [],
    activeRating: '',
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
      activeRating: '',
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
    });
  };

  filterFilms() {
    const currentFilteredFilms = [...this.state.filteredFilms];

    const filteredFilms = currentFilteredFilms.filter((film, index) => {
      const filmFilters = currentFilteredFilms[index].genre_ids.sort().join(' ');
      const activeFilters = this.state.activeFilters.sort().join(' ');
      return filmFilters.includes(activeFilters) ? currentFilteredFilms[index] : null;
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
      <Film key={film.id} data={film} />
    ));

    const Filters = this.state.filteredGenres.map((filter) => {
      const filterObj = this.state.genres.filter(genre => genre.id === filter);
      return (
        <button
          type="button"
          key={filterObj[0].id}
          onClick={() => this.toggleFilter(filterObj[0].id)}
          disabled={this.state.activeFilters.includes(filterObj[0].id)}
        >
          {filterObj[0].name}
        </button>
      );
    });
    return (
      <Fragment>
        {Filters}
        <select onChange={e => this.changeRating(e)} disabled={this.state.activeRating} value={this.state.activeRating}>
          <option value="">Choose a rating</option>
          <option value="0.5">0.5</option>
          <option value="1">1</option>
          <option value="1.5">1.5</option>
          <option value="2">2</option>
          <option value="2.5">2.5</option>
          <option value="3">3</option>
          <option value="3.5">3.5</option>
          <option value="4">4</option>
          <option value="4.5">4.5</option>
          <option value="5">5</option>
          <option value="5.5">5.5</option>
          <option value="6">6</option>
          <option value="6.5">6.5</option>
          <option value="7">7</option>
          <option value="7.5">7.5</option>
          <option value="8">8</option>
          <option value="8.5">8.5</option>
          <option value="9">9</option>
          <option value="9.5">9.5</option>
          <option value="10">10</option>
        </select>
        {(this.state.activeFilters.length > 0 || this.state.activeRating)
          && (
            <button
              type="button"
              onClick={this.resetFilters}
            >
              Reset Filters
            </button>
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
