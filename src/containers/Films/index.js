import React, { PureComponent } from 'react';
import Film from '../../components/Film';
import { getNowPlayingMovies } from '../../api/requests';
import { orderByPopularity } from '../../utility';

class Films extends PureComponent {
  state = {
    films: [],
  }

  componentDidMount() {
    this.getCurrentPlayingFilms();
  }

  async getCurrentPlayingFilms() {
    const results = await getNowPlayingMovies();
    const orderedResults = orderByPopularity(results.data.results);
    console.log(orderedResults);
    this.setState({
      films: orderedResults,
    });
  }

  render() {
    if (this.state.films.length === 0) {
      return null;
    }
    const AllFilms = this.state.films.map(film => (
      <Film key={film.id} data={film} />
    ));
    return (
      <div>
        {AllFilms}
      </div>
    );
  }
}

export default Films;
