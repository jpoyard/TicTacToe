/* eslint-disable testing-library/no-node-access */
import { cleanup, render } from '@testing-library/react';
import { Board } from './Board';

// eslint-disable-next-line jest/valid-title
describe(Board.name, () => {
  let container = null;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    cleanup(container);
    container.remove();
    container = null;
  });

  [
    {
      when: {
        squares: ['X', null, null, null, 'O', null, null, null, null],
        winnerSquares: [],
      },
      then: {
        squares: ['X', '', '', '', 'O', '', '', '', ''],
        winnerSquares: [],
      },
    },
    {
      when: {
        squares: ['X', 'O', null, 'O', 'O', 'X', 'X', 'O', 'X'],
        winnerSquares: [1, 4, 7],
      },
      then: {
        squares: ['X', 'O', '', 'O', 'O', 'X', 'X', 'O', 'X'],
        winnerSquares: ['O', 'O', 'O'],
      },
    },
  ].forEach(({ when, then }) => {
    it(`should be ${JSON.stringify(then)} when squares=${when.squares.map(
      (square) => square ?? '_'
    )} and winnerSquares=${when.winnerSquares}`, () => {
      const actual = render(
        <Board squares={when.squares} winnerSquares={when.winnerSquares} />,
        container
      ).container;
      expect(
        Array.from(actual.querySelectorAll('.square')).map((e) => e.textContent)
      ).toEqual(then.squares);

      expect(
        Array.from(actual.querySelectorAll('.square.win')).map(
          (e) => e.textContent
        )
      ).toEqual(then.winnerSquares);
    });
  });

  it('should handle square click event', () => {
    const handleClick = jest.fn();

    const actual = render(
      <Board
        squares={['X', null, null, null, 'O', null, null, null, null]}
        winnerSquares={[]}
        onClick={(i) => handleClick(i)}
      />,
      container
    ).container;

    for (let index = 0; index < 9; index++) {
      actual
        .querySelectorAll('.square')
        [index].dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(handleClick).toHaveBeenCalledWith(index);
    }
  });
});
