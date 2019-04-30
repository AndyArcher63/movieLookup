const orderByPopularity = films => (
  films.sort((a, b) => (
    (a.popularity < b.popularity) ? 1 : -1))
);

const filterFilms = () => {

};

export { orderByPopularity, filterFilms };
