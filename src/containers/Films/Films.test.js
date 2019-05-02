import React from 'react';
import { shallow } from 'enzyme';
import Films from '.';
import { getNowPlayingMovies, getFilmGenres } from '../../api/requests';
import { films, genres } from './__mocks__';

jest.mock('../../api/requests');

describe('<Films />', () => {
  let wrapper;
  beforeEach(() => {
    getNowPlayingMovies.mockImplementation(() => (Promise.resolve({ data: films })));
    getFilmGenres.mockImplementation(() => (Promise.resolve({ data: genres })));
    wrapper = shallow(<Films />);
  });

  it('should display 20 films based on mock api', () => {
    expect(wrapper.find('Film')).toHaveLength(20);
  });

  it('should display reset button if `state.activeFilters`.length > 0', () => {
    wrapper.setState({
      activeFilters: [123],
    });
    expect(wrapper.find('ResetButton')).toHaveLength(1);
  });

  it('should display reset button if `state.activeRating` > 0', () => {
    wrapper.setState({
      activeRating: 1,
    });
    expect(wrapper.find('ResetButton')).toHaveLength(1);
  });

  describe('filterFilms()', () => {
    it('should filter 20 filterFilms to 8 when filter Action (28) is applied', () => {
      wrapper.setState({
        activeFilters: [28],
      });
      wrapper.instance().filterFilms();

      expect(wrapper.state().filteredFilms).toHaveLength(8);
    });
  });
});
