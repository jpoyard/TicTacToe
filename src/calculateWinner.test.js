import { calculateWinner } from './calculateWinner';

[
  { when: [null, null, null, null, null, null, null, null, null], then: null },
  { when: ['X', 'X', 'O', 'O', 'X', 'X', 'X', 'O', 'O'], then: null },
  {
    when: ['X', 'X', 'X', 'O', 'O', null, null, null, null],
    then: { squares: [0, 1, 2], winner: 'X' },
  },
  {
    when: ['O', 'O', 'O', 'X', 'X', null, null, null, null],
    then: { squares: [0, 1, 2], winner: 'O' },
  },
  {
    when: ['X', null, null, 'X', 'O', null, 'X', null, 'O'],
    then: { squares: [0, 3, 6], winner: 'X' },
  },
].forEach(({ when, then }) => {
  test(`should return ${JSON.stringify(then)} when squares=${when.map((square, i) => (square ?? '_'))}`, () => {
    // Given
    // When
    const actual = calculateWinner(when);
    // Then
    expect(actual).toEqual(then);
  });
});
