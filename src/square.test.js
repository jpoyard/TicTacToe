/* eslint-disable testing-library/no-node-access */
import { cleanup, render } from '@testing-library/react';
import { Square } from './square';

describe('Square', () => {
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
    { when: null, then: '' },
    { when: 'X', then: 'X' },
    { when: 'O', then: 'O' },
  ].forEach(({ when, then }) => {
    it(`should contains '${then}' when value=${when}`, () => {
      const actual = render(
        <Square value={then} win="false"></Square>,
        container
      ).container;
      expect(actual.querySelector('.square').textContent).toBe(then);
    });
  });

  [
    { when: false, then: 'square' },
    { when: true, then: 'square win' },
  ].forEach(({ when, then }) => {
    it(`should have className='${then}' when win=${when}`, () => {
      const actual = render(
        <Square value="X" win={when}></Square>,
        container
      ).container;
      expect(actual.querySelector('.square').className).toBe(then);
    });
  });
});
