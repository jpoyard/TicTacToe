/* eslint-disable testing-library/no-node-access */
import { cleanup, render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Game } from './Game';

// eslint-disable-next-line jest/valid-title
describe(Game.name, () => {
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
      when: [0, 0, 8, 6, 3, 2, 4, 1, 7],
      then: {
        board: ['X', 'X', 'X', 'O', 'O', '', 'X', '', 'O'],
        status: 'X a gagné',
      },
    },
    {
      when: [0, 1, 8, 4, 7, 6, 3, 2],
      then: {
        board: ['X', 'O', 'O', 'X', 'O', '', 'O', 'X', 'X'],
        status: 'O a gagné',
      },
    },
    {
      when: [0, 4, 6, 3, 5, 8, 2, 1, 7],
      then: {
        board: ['X', 'O', 'X', 'O', 'O', 'X', 'X', 'X', 'O'],
        status: 'Match null',
      },
    },
  ].forEach(({ when, then }) => {
    it(`should manage game correctly when ${then.status}`, () => {
      // Given
      // When
      playGame(container, when);
      // Then
      expect(
        Array.from(document.querySelectorAll('.square')).map(
          (e) => e.textContent
        )
      ).toEqual(then.board);
      expect(document.querySelector('.game-info .status').textContent).toBe(
        then.status
      );
    });
  });

  it('should manage display history correctly', () => {
    playGame(container, [0, 8, 6, 3, 2, 4, 1]);

    const expectedHistory = [
      'Revenir au début de la partie',
      'Revenir au tour n°1 {row: 0, column: 0}',
      'Revenir au tour n°2 {row: 2, column: 2}',
      'Revenir au tour n°3 {row: 2, column: 0}',
      'Revenir au tour n°4 {row: 1, column: 0}',
      'Revenir au tour n°5 {row: 0, column: 2}',
      'Revenir au tour n°6 {row: 1, column: 1}',
      'Revenir au tour n°7 {row: 0, column: 1}',
    ];
    // Check history
    expect(
      Array.from(document.querySelectorAll('li')).map((e) => e.textContent)
    ).toEqual(expectedHistory);

    // Reverse Order
    act(() => {
      document
        .querySelector('button.toggleHistoryBtn')
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(
      Array.from(document.querySelectorAll('li')).map((e) => e.textContent)
    ).toEqual(expectedHistory.reverse());
  });

  it('should manage history jump correctly', () => {
    playGame(container, [0, 8, 6, 3, 2, 4, 1]);
    act(() => {
      document
        .querySelectorAll('li button')[4]
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(
      Array.from(document.querySelectorAll('.square')).map((e) => e.textContent)
    ).toEqual(['X', '', '', 'O', '', '', 'X', '', 'O']);
  });
});

function playGame(container, sequence) {
  const actual = render(<Game />, container).container;
  sequence.forEach((squareIndex) => {
    act(() => {
      document
        .querySelectorAll('.square')
        [squareIndex].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
  });
  return actual;
}
