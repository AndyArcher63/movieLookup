import React, { PureComponent } from 'react';
import Film from '../../components/Film';
import { getNowPlayingMovies } from '../../api/requests';

class Films extends PureComponent {
  state = {
    films: [],
  }

  componentDidMount() {
    this.getCurrentPlayingFilms();
  }

  async getCurrentPlayingFilms() {
    const results = await getNowPlayingMovies();
    this.setState({
      films: results.data.results,
    });
  }

  render() {
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
