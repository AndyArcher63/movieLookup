import orderByPopularity from '.';

describe('orderByPopularity', () => {

  it('should order array of objects by popularity', () => {
    const test = orderByPopularity([
      {
        popularity: 2,
      },
      {
        popularity: 1,
      },
      {
        popularity: 4,
      },
    ]);
    expect(test).toEqual([
      {
        popularity: 4,
      },
      {
        popularity: 2,
      },
      {
        popularity: 1,
      },
    ]);
  });
});